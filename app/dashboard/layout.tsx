import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/connexion?redirect=/dashboard')

  const { data: profile } = await supabase
    .from('profiles')
    .select('nom, forfait, statut')
    .eq('id', user.id)
    .single()

  if (!profile || profile.statut !== 'actif') redirect('/attente')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 flex flex-col z-40">
        <div className="p-6 border-b border-white/10">
          <div className="text-xl font-black text-white">
            Post<span className="text-brand-400">Flow</span> AI
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Plan {profile.forfait ? profile.forfait.charAt(0).toUpperCase() + profile.forfait.slice(1) : ''}
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm font-medium">
            <span>🏠</span> Tableau de bord
          </a>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
              {profile.nom?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-semibold text-white truncate">{profile.nom}</div>
              <div className="text-xs text-gray-400 truncate">{user.email}</div>
            </div>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="w-full text-left px-3 py-2 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white text-xs font-medium transition-all">
              → Se déconnecter
            </button>
          </form>
        </div>
      </aside>
      {/* Main content */}
      <main className="ml-64 p-8">{children}</main>
    </div>
  )
}
