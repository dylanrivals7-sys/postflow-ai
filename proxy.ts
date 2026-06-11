import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // ── Protection du dashboard ──
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/connexion?redirect=/dashboard', request.url))
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('statut')
      .eq('id', user.id)
      .single()

    if (!profile || profile.statut !== 'actif') {
      return NextResponse.redirect(new URL('/attente', request.url))
    }
  }

  // ── Protection de la page admin ──
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminSession = request.cookies.get('admin_session')
    if (!adminSession || adminSession.value !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // ── Rediriger users connectés hors des pages auth ──
  if ((pathname === '/connexion' || pathname === '/inscription') && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('statut')
      .eq('id', user.id)
      .single()

    if (profile?.statut === 'actif') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (profile?.statut === 'en_attente') {
      return NextResponse.redirect(new URL('/attente', request.url))
    }
    if (profile?.statut === 'non_paye') {
      return NextResponse.redirect(new URL('/paiement', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
