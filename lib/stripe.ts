import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
})

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 19,
    priceId: process.env.STRIPE_PRICE_STARTER!,
    features: ['30 posts / mois', 'LinkedIn + Instagram', '5 tons de voix', 'Hashtags suggérés'],
  },
  pro: {
    name: 'Pro',
    price: 39,
    priceId: process.env.STRIPE_PRICE_PRO!,
    features: ['Posts illimités', 'LinkedIn + Instagram + TikTok', '20 tons + ton personnalisé', 'Calendrier éditorial IA', 'Export PDF / Notion / Buffer'],
  },
  agence: {
    name: 'Agence',
    price: 79,
    priceId: process.env.STRIPE_PRICE_AGENCE!,
    features: ['Tout le plan Pro', "10 espaces clients", 'Marque blanche', '3 utilisateurs', 'Support prioritaire 7j/7'],
  },
} as const

export type PlanKey = keyof typeof PLANS
