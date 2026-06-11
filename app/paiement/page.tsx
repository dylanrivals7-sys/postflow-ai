'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const PLANS = [
  {
    key: 'starter',
    name: 'Starter',
    price: 19,
    tagline: 'Pour commencer à publier régulièrement',
    features: ['30 posts / mois', 'LinkedIn + Instagram', '5 tons de voix', 'Hashtags IA'],
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 39,
    tagline: 'Pour scaler ta visibilité',
    popular: true,
    features: ['Posts illimités', 'LinkedIn + Instagram + TikTok', '20 tons + personnalisé', 'Calendrier IA 30 jours', 'Export PDF / Notion'],
  },
  {
    key: 'agence',
    name: 'Agence',
    price: 79,
    tagline: 'Pour les agences multi-clients',
    features: ["Tout le plan Pro", "10 espaces clients", 'Marque blanche', 'Équipe 3 utilisateurs', 'Support 7j/7'],
  },
]

export default function PaiementPage() {
  const router = useRouter()
  const [selected, setSelected] = useState('pro')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/connexion?redirect=/paiement')
        return
      }
      // Si déjà actif → dashboard
      const { data: profile } = await supabase
        .from('profiles')
        .select('statut')
        .eq('id', user.id)
        .single()
      if (profile?.statut === 'actif') {
        router.replace('/dashboard')
        return
      }
      if (profile?.statut === 'en_attente') {
        router.replace('/attente')
        return
      }
      setChecking(false)
    }
    checkAuth()
  }, [router])

  async function handlePay() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forfait: selected }),
      })
      const json = await res.json()
      if (!res.ok || !json.url) {
        setError(json.error ?? 'Erreur lors de la redirection vers le paiement.')
        return
      }
      window.location.href = json.url
    } catch {
      setError('Une erreur inattendue est survenue.')
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-brand-50 to-purple-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <Link href="/" className="text-2xl font-black text-gray-900 inline-block mb-6">
            Post<span className="text-brand-500">Flow</span> AI
          </Link>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Choisis ton forfait</h1>
          <p className="text-gray-500">7 jours gratuits · Sans engagement · Annulable en 2 clics</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex gap-2.5 text-sm text-amber-800">
          <span className="text-lg flex-shrink-0">ℹ️</span>
          <div>
            <strong>Activation sous 1 à 2 jours ouvrés</strong> après validation manuelle de votre paiement.
            Vous recevrez un email dès que votre accès est ouvert.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {PLANS.map(plan => (
            <button
              key={plan.key}
              onClick={() => setSelected(plan.key)}
              className={`relative text-left rounded-2xl border-2 p-5 transition-all ${
                selected === plan.key
                  ? 'border-brand-500 bg-white shadow-lg shadow-brand-500/15 scale-[1.02]'
                  : 'border-gray-200 bg-white hover:border-brand-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  ⭐ Populaire
                </div>
              )}
              {selected === plan.key && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="white">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              )}
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">{plan.name}</div>
              <div className="text-3xl font-black text-gray-900 mb-0.5">
                {plan.price}<span className="text-base font-medium text-gray-400">€/mois</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">{plan.tagline}</p>
              <ul className="space-y-1.5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className="text-emerald-500 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={loading}
          className="btn-primary w-full justify-center py-4 text-base"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Redirection vers le paiement…
            </span>
          ) : (
            <>Payer avec Stripe — {PLANS.find(p => p.key === selected)?.price}€/mois →</>
          )}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 Paiement sécurisé Stripe · Remboursement 14 jours si insatisfait
        </p>
      </div>
    </div>
  )
}
