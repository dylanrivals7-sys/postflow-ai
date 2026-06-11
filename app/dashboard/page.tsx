import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('nom, forfait, type_profil, date_activation')
    .eq('id', user!.id)
    .single()

  const dateActivation = profile?.date_activation
    ? new Date(profile.date_activation).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    : null

  const forfaitLabels: Record<string, { color: string; name: string }> = {
    starter: { color: 'bg-blue-100 text-blue-700',    name: 'Starter' },
    pro:     { color: 'bg-brand-100 text-brand-700',  name: 'Pro' },
    agence:  { color: 'bg-purple-100 text-purple-700', name: 'Agence' },
  }
  const forfaitInfo = forfaitLabels[profile?.forfait ?? 'starter']

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-black text-gray-900 mb-1">
          Bonjour {profile?.nom?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 text-sm">
          Bienvenue sur ton dashboard PostFlow AI.{dateActivation ? ` Compte actif depuis le ${dateActivation}.` : ''}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Posts générés', value: '0', icon: '✨', sub: 'ce mois-ci' },
          { label: 'LinkedIn', value: '0', icon: '🔵', sub: 'posts créés' },
          { label: 'Instagram', value: '0', icon: '📸', sub: 'posts créés' },
          { label: 'TikTok scripts', value: '0', icon: '🎵', sub: 'créés' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            <div className="text-xs font-semibold text-gray-500 mt-0.5">{stat.label}</div>
            <div className="text-xs text-gray-400">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Accès anticipé */}
      <div className="bg-gradient-to-br from-brand-600 to-brand-500 rounded-3xl p-8 mb-8 text-white">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest opacity-75 mb-2">Accès anticipé — Bêta</div>
            <h2 className="text-xl font-black mb-2">Le générateur arrive très bientôt ✨</h2>
            <p className="text-white/70 text-sm max-w-md">
              Tu fais partie des premiers testeurs de PostFlow AI. Le générateur de posts sera disponible
              dans les prochains jours. On te notifie par email dès que c'est en ligne.
            </p>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${forfaitInfo.color} flex-shrink-0`}>
            Plan {forfaitInfo.name}
          </span>
        </div>
        <div className="mt-6 flex items-center gap-2 text-white/60 text-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Ton compte est actif · Tu seras notifié·e par email
        </div>
      </div>

      {/* Info accès */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="font-black text-gray-900 mb-4">📬 Ce qui t'attend</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: '✍️', title: 'Génération de posts', desc: 'LinkedIn, Instagram, TikTok — en 30 secondes depuis ton tableau de bord.' },
            { icon: '🎨', title: 'Ton de voix personnalisé', desc: 'PostFlow AI apprend ton style pour des posts qui te ressemblent vraiment.' },
            { icon: '📅', title: 'Calendrier éditorial', desc: '30 jours de contenu planifié automatiquement selon ta niche.' },
          ].map(card => (
            <div key={card.title} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
              <div className="text-2xl mb-2">{card.icon}</div>
              <div className="font-bold text-gray-900 text-sm mb-1">{card.title}</div>
              <div className="text-xs text-gray-500">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
