import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { success?: string; nom?: string }
}) {
  const supabase = createAdminClient()

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, nom, email, forfait, statut, type_profil, date_inscription, date_activation, validation_token')
    .order('date_inscription', { ascending: false })

  const stats = {
    total:      profiles?.length ?? 0,
    actifs:     profiles?.filter(p => p.statut === 'actif').length ?? 0,
    en_attente: profiles?.filter(p => p.statut === 'en_attente').length ?? 0,
    non_paye:   profiles?.filter(p => p.statut === 'non_paye').length ?? 0,
    suspendus:  profiles?.filter(p => p.statut === 'suspendu').length ?? 0,
  }

  const statutColors: Record<string, string> = {
    actif:       'bg-emerald-100 text-emerald-700',
    en_attente:  'bg-amber-100 text-amber-700',
    non_paye:    'bg-gray-100 text-gray-600',
    suspendu:    'bg-red-100 text-red-700',
  }

  const forfaitColors: Record<string, string> = {
    starter: 'bg-blue-100 text-blue-700',
    pro:     'bg-brand-100 text-brand-700',
    agence:  'bg-purple-100 text-purple-700',
  }

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">
              Post<span className="text-brand-400">Flow</span> AI — Admin
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">Gestion des comptes utilisateurs</p>
          </div>
          <a href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            ← Retour au site
          </a>
        </div>

        {/* Message de succès */}
        {searchParams.success && (
          <div className="bg-emerald-900/50 border border-emerald-700 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <div className="font-bold text-emerald-300">Compte activé !</div>
              <div className="text-sm text-emerald-400">
                Le compte de <strong>{decodeURIComponent(searchParams.nom ?? '')}</strong> a été activé.
                Un email de confirmation lui a été envoyé.
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'text-white' },
            { label: 'Actifs', value: stats.actifs, color: 'text-emerald-400' },
            { label: 'En attente', value: stats.en_attente, color: 'text-amber-400' },
            { label: 'Non payés', value: stats.non_paye, color: 'text-gray-400' },
            { label: 'Suspendus', value: stats.suspendus, color: 'text-red-400' },
          ].map(s => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tableau */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <h2 className="font-bold text-white">Tous les comptes ({stats.total})</h2>
            <span className="text-xs text-gray-500">Mis à jour en temps réel</span>
          </div>

          {!profiles?.length && (
            <div className="p-12 text-center text-gray-500">Aucun utilisateur pour l'instant.</div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="text-left px-5 py-3">Utilisateur</th>
                  <th className="text-left px-5 py-3">Forfait</th>
                  <th className="text-left px-5 py-3">Type</th>
                  <th className="text-left px-5 py-3">Statut</th>
                  <th className="text-left px-5 py-3">Date</th>
                  <th className="text-left px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {profiles?.map(p => (
                  <tr key={p.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-white">{p.nom}</div>
                      <div className="text-xs text-gray-400">{p.email}</div>
                    </td>
                    <td className="px-5 py-4">
                      {p.forfait ? (
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${forfaitColors[p.forfait] ?? 'bg-gray-100 text-gray-600'}`}>
                          {p.forfait.charAt(0).toUpperCase() + p.forfait.slice(1)}
                        </span>
                      ) : <span className="text-gray-600">—</span>}
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs capitalize">{p.type_profil}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statutColors[p.statut] ?? 'bg-gray-100 text-gray-600'}`}>
                        {p.statut.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs">
                      {new Date(p.date_inscription).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-5 py-4">
                      {p.statut === 'en_attente' && p.validation_token ? (
                        <a
                          href={`${APP_URL}/api/admin/valider/${p.validation_token}`}
                          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          ✅ Activer
                        </a>
                      ) : p.statut === 'actif' ? (
                        <span className="text-xs text-emerald-500 font-medium">✓ Actif</span>
                      ) : (
                        <span className="text-xs text-gray-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
