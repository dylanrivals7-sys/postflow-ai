import { NextRequest, NextResponse } from 'next/server'
import { stripe, PLANS, type PlanKey } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { forfait } = await request.json() as { forfait: PlanKey }

    if (!forfait || !PLANS[forfait]) {
      return NextResponse.json({ error: 'Forfait invalide' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const plan = PLANS[forfait]
    const appUrl = process.env.NEXT_PUBLIC_APP_URL!

    // Récupérer ou créer le Stripe Customer
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, nom, email')
      .eq('id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        name: profile?.nom ?? '',
        metadata: { supabase_user_id: user.id },
      })
      customerId = customer.id

      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: plan.priceId, quantity: 1 }],
      success_url: `${appUrl}/attente?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/#tarifs`,
      metadata: {
        supabase_user_id: user.id,
        forfait,
      },
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
          forfait,
        },
      },
      locale: 'fr',
      custom_text: {
        submit: {
          message: 'Votre compte sera activé sous 1 à 2 jours ouvrés après validation de votre paiement.',
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[stripe/checkout]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
