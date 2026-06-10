import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AttentePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('nom, forfait, statut')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-brand-50 to-purple-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <Link href="/" className="text-2xl font-black text-gray-900 inline-block mb-10">
          Post<span className="text-brand-500">Flow</span> AI
        </Link>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
          {/* Animation de sablier */}
          <div className="text-6xl mb-6 animate-bounce">⏳</div>

          <h1 className="text-2xl font-black text-gray-900 mb-3">
            {profile?.nom ? `Bienvenue ${profile.nom.split(' ')[0]} !` : 'Compte en cours de validation'}
          </h1>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 text-left">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>✅ Paiement reçu !</strong> Notre équipe va valider ton accès au plan{' '}
              <strong>{profile?.forfait ? profile.forfait.charAt(0).toUpperCase() + profile.forfait.slice(1) : ''}</strong>{' '}
              dans les <strong>1 à 2 jours ouvrés</strong>.
              <br /><br />
              Tu recevras un email de confirmation sur{' '}
              <strong>{user?.email}</strong> dès que ton compte est actif.
              <strong> Aucune action de ta part n'est nécessaire.</strong>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: '💳', label: 'Paiement', status: 'Confirmé', ok: true },
              { icon: '🔍', label: 'Validation', status: 'En cours…', ok: false },
              { icon: '🚀', label: 'Accès', status: 'Bientôt', ok: false },
            ].map(step => (
              <div key={step.label} className={`rounded-xl p-3 text-center ${step.ok ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50 border border-gray-200'}`}>
                <div className="text-2xl mb-1">{step.icon}</div>
                <div className="text-xs font-bold text-gray-700">{step.label}</div>
                <div className={`text-xs mt-0.5 font-semibold ${step.ok ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {step.status}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Une question ? Écris-nous à{' '}
            <a href="mailto:bonjour@postflow.ai" className="text-brand-500 font-semibold hover:underline">
              bonjour@postflow.ai
            </a>
          </p>

          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="text-sm text-gray-400 hover:text-gray-600 transition-colors underline">
              Se déconnecter
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
