import { NextRequest, NextResponse } from 'next/server'
import { stripe, PLANS, type PlanKey } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      forfait: PlanKey
      // Champs présents si l'utilisateur n'est pas encore connecté
      nom?: string
      email?: string
      password?: string
      type_profil?: string
    }

    const { forfait } = body

    if (!forfait || !PLANS[forfait]) {
      return NextResponse.json({ error: 'Forfait invalide' }, { status: 400 })
    }

    const plan = PLANS[forfait]
    const appUrl = process.env.NEXT_PUBLIC_APP_URL!
    const supabase = createAdminClient()

    let userId: string
    let userEmail: string

    // ── Cas 1 : utilisateur déjà connecté (page /paiement) ──────────
    if (!body.email) {
      // On essaie de récupérer la session via le cookie
      const { createClient } = await import('@/lib/supabase/server')
      const userSupabase = await createClient()
      const { data: { user } } = await userSupabase.auth.getUser()

      if (!user) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
      }
      userId = user.id
      userEmail = user.email!
    } else {
      // ── Cas 2 : nouvel utilisateur depuis /inscription ─────────────
      const { nom, email, password, type_profil } = body

      if (!nom || !email || !password || !type_profil) {
        return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
      }

      // Créer le compte via admin client (bypass email confirmation)
      const { data: userData, error: signUpError } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: { nom, type_profil },
        email_confirm: true, // pas besoin de vérification email
      })

      if (signUpError) {
        if (signUpError.message.includes('already been registered') || signUpError.message.includes('already registered')) {
          return NextResponse.json({ error: 'Cet email est déjà utilisé. Connecte-toi pour accéder à la page de paiement.' }, { status: 400 })
        }
        return NextResponse.json({ error: signUpError.message }, { status: 400 })
      }

      userId = userData.user.id
      userEmail = email
    }

    // ── Récupérer ou créer le Stripe Customer ────────────────────
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, nom')
      .eq('id', userId)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        name: profile?.nom ?? body.nom ?? '',
        metadata: { supabase_user_id: userId },
      })
      customerId = customer.id

      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId)
    }

    // ── Créer la session Stripe Checkout ─────────────────────────
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: plan.priceId, quantity: 1 }],
      success_url: `${appUrl}/attente?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/paiement`,
      metadata: {
        supabase_user_id: userId,
        forfait,
      },
      subscription_data: {
        metadata: {
          supabase_user_id: userId,
          forfait,
        },
      },
      locale: 'fr',
      custom_text: {
        submit: {
          message: 'Votre accès PostFlow AI sera activé sous 24h après réception du paiement.',
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[stripe/checkout]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
