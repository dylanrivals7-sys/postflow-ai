import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import { resend, FROM, ADMIN_EMAIL, APP_URL } from '@/lib/resend'
import { emailPaiementConfirme } from '@/lib/emails/paiement-confirme'
import { emailAdminNotification } from '@/lib/emails/admin-notification'
import { randomBytes } from 'crypto'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook error'
    console.error('[webhook] Signature invalide:', message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const supabase = createAdminClient()

  // ── checkout.session.completed ──────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.metadata?.supabase_user_id
    const forfait = session.metadata?.forfait
    const subscriptionId = session.subscription as string

    if (!userId || !forfait) {
      console.error('[webhook] Metadata manquante:', session.metadata)
      return NextResponse.json({ received: true })
    }

    // Générer un token de validation sécurisé
    const validationToken = randomBytes(32).toString('hex')

    // Mettre à jour le profil
    const { data: profile, error } = await supabase
      .from('profiles')
      .update({
        forfait,
        statut: 'en_attente',
        stripe_subscription_id: subscriptionId,
        validation_token: validationToken,
      })
      .eq('id', userId)
      .select('nom, email, type_profil')
      .single()

    if (error || !profile) {
      console.error('[webhook] Erreur mise à jour profil:', error)
      return NextResponse.json({ error: 'Profil introuvable' }, { status: 500 })
    }

    const validationUrl = `${APP_URL}/admin/valider/${validationToken}`
    const dateInscription = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    })

    // Email 1 : confirmation à l'utilisateur
    await resend.emails.send({
      from: FROM,
      to: profile.email,
      subject: 'Paiement reçu ✅ — Votre compte PostFlow AI est en cours de validation',
      html: emailPaiementConfirme({
        nom: profile.nom,
        forfait: forfait.charAt(0).toUpperCase() + forfait.slice(1),
        appUrl: APP_URL,
      }),
    })

    // Email 2 : notification à l'admin
    if (ADMIN_EMAIL) {
      await resend.emails.send({
        from: FROM,
        to: ADMIN_EMAIL,
        subject: `💳 Nouveau paiement PostFlow AI — ${profile.nom} — Plan ${forfait}`,
        html: emailAdminNotification({
          nom: profile.nom,
          email: profile.email,
          forfait: forfait.charAt(0).toUpperCase() + forfait.slice(1),
          typeProfile: profile.type_profil,
          validationUrl,
          dateInscription,
        }),
      })
    }
  }

  // ── customer.subscription.deleted ───────────────────────────
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object
    await supabase
      .from('profiles')
      .update({ statut: 'suspendu' })
      .eq('stripe_subscription_id', subscription.id)
  }

  return NextResponse.json({ received: true })
}
