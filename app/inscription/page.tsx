'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Suspense } from 'react'

function InscriptionForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const forfaitParam = searchParams.get('forfait') ?? 'pro'

  const [form, setForm] = useState({
    nom: '',
    email: '',
    password: '',
    type_profil: 'coach',
    forfait: forfaitParam,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const plans = [
    { key: 'starter', label: 'Starter — 19€/mois' },
    { key: 'pro',     label: 'Pro — 39€/mois' },
    { key: 'agence',  label: 'Agence — 79€/mois' },
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createClient()

      // 1. Créer le compte Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            nom: form.nom,
            type_profil: form.type_profil,
          },
        },
      })

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('Cet email est déjà utilisé. Connecte-toi à la place.')
        } else {
          setError(signUpError.message)
        }
        return
      }

      if (!data.user) {
        setError('Erreur lors de la création du compte.')
        return
      }

      // 2. Créer la session Stripe Checkout
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forfait: form.forfait }),
      })

      const json = await res.json()

      if (!res.ok || !json.url) {
        setError(json.error ?? 'Erreur lors de la redirection vers le paiement.')
        return
      }

      // 3. Rediriger vers Stripe
      window.location.href = json.url
    } catch {
      setError('Une erreur inattendue est survenue. Réessaie.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-brand-50 to-purple-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black text-gray-900 inline-block mb-6">
            Post<span className="text-brand-500">Flow</span> AI
          </Link>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Crée ton compte</h1>
          <p className="text-gray-500 text-sm">7 jours gratuits, sans engagement</p>
        </div>

        {/* Avertissement délai validation */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex gap-2.5 text-sm text-amber-800">
          <span className="text-lg flex-shrink-0">ℹ️</span>
          <div>
            <strong>Délai d'activation :</strong> Votre compte sera activé sous
            <strong> 1 à 2 jours ouvrés</strong> après validation de votre paiement.
            Vous recevrez un email de confirmation dès que votre accès est ouvert.
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nom complet</label>
              <input
                type="text"
                required
                placeholder="Sophie Martin"
                className="input-field"
                value={form.nom}
                onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                placeholder="sophie@email.com"
                className="input-field"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mot de passe</label>
              <input
                type="password"
                required
                minLength={8}
                placeholder="8 caractères minimum"
                className="input-field"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type de profil</label>
              <select
                className="input-field bg-white"
                value={form.type_profil}
                onChange={e => setForm(f => ({ ...f, type_profil: e.target.value }))}
              >
                <option value="coach">Coach</option>
                <option value="consultant">Consultant·e</option>
                <option value="agence">Agence</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Forfait choisi</label>
              <select
                className="input-field bg-white"
                value={form.forfait}
                onChange={e => setForm(f => ({ ...f, forfait: e.target.value }))}
              >
                {plans.map(p => (
                  <option key={p.key} value={p.key}>{p.label}</option>
                ))}
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Création du compte…
                </span>
              ) : (
                'Créer mon compte et payer →'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          Déjà un compte ?{' '}
          <Link href="/connexion" className="text-brand-500 font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
        <p className="text-center text-xs text-gray-400 mt-3">
          🔒 Paiement sécurisé Stripe · RGPD
        </p>
      </div>
    </div>
  )
}

export default function InscriptionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement…</div>}>
      <InscriptionForm />
    </Suspense>
  )
}
