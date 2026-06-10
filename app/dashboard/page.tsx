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

      {/* Générateur rapide */}
      <div className="bg-gradient-to-br from-brand-600 to-brand-500 rounded-3xl p-8 mb-8 text-white">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest opacity-75 mb-2">Prêt à créer</div>
            <h2 className="text-xl font-black mb-2">Génère ton premier post ✨</h2>
            <p className="text-white/70 text-sm max-w-md">
              Décris ton idée en une phrase et PostFlow AI génère un post LinkedIn, Instagram ou TikTok en 30 secondes.
            </p>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${forfaitInfo.color} flex-shrink-0`}>
            Plan {forfaitInfo.name}
          </span>
        </div>
        <a
          href="/dashboard/generateur"
          className="inline-flex items-center gap-2 mt-6 bg-white text-brand-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg"
        >
          Générer un post →
        </a>
      </div>

      {/* Guides de démarrage */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="font-black text-gray-900 mb-4">🚀 Pour bien démarrer</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: '🎯', title: 'Configure ton ton de voix', desc: "Personnalise le style d'écriture adapté à ta niche.", href: '/dashboard/parametres' },
            { icon: '📅', title: 'Planifie tes posts', desc: 'Utilise le calendrier éditorial IA pour 30 jours de contenu.', href: '/dashboard/calendrier' },
            { icon: '📱', title: 'Connecte tes réseaux', desc: "Publie directement depuis ton dashboard sans copier-coller.", href: '/dashboard/parametres' },
          ].map(card => (
            <a key={card.title} href={card.href} className="block p-4 rounded-xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50 transition-all">
              <div className="text-2xl mb-2">{card.icon}</div>
              <div className="font-bold text-gray-900 text-sm mb-1">{card.title}</div>
              <div className="text-xs text-gray-500">{card.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
