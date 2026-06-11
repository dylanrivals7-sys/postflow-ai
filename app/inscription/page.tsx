'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function InscriptionForm() {
  const searchParams = useSearchParams()
  const forfaitParam = searchParams.get('forfait') ?? 'pro'

  const [form, setForm] = useState({
    nom: '',
    email: '',
    password: '',
    type_profil: 'coach',
    forfait: forfaitParam,
  })
  const [rgpd, setRgpd] = useState(false)
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

    if (!rgpd) {
      setError('Tu dois accepter les CGU et la politique de confidentialité pour continuer.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          forfait: form.forfait,
          nom: form.nom,
          email: form.email,
          password: form.password,
          type_profil: form.type_profil,
        }),
      })

      const json = await res.json()

      if (!res.ok || !json.url) {
        setError(json.error ?? 'Erreur lors de la redirection vers le paiement.')
        return
      }

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
          <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            🚀 Accès anticipé — Bêta
          </span>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Crée ton compte</h1>
          <p className="text-gray-500 text-sm">Rejoins les premiers testeurs PostFlow AI</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex gap-2.5 text-sm text-amber-800">
          <span className="text-lg flex-shrink-0">ℹ️</span>
          <div>
            <strong>Délai d'activation :</strong> Ton accès est activé sous <strong>24h</strong> après
            réception de ton paiement. Tu peux annuler à tout moment pendant cette période sans être débité.
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

            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                required
                checked={rgpd}
                onChange={e => setRgpd(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-brand-500 flex-shrink-0"
              />
              <span className="text-xs text-gray-600 leading-relaxed">
                J'ai lu et j'accepte les{' '}
                <Link href="/cgu" target="_blank" className="text-brand-500 font-semibold hover:underline">CGU</Link>
                {' '}et la{' '}
                <Link href="/confidentialite" target="_blank" className="text-brand-500 font-semibold hover:underline">politique de confidentialité</Link>
              </span>
            </label>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                {error}
                {error.includes('déjà utilisé') && (
                  <Link href="/connexion" className="block mt-1 font-bold underline">→ Se connecter</Link>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !rgpd}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
