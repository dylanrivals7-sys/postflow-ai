import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { resend, FROM, APP_URL } from '@/lib/resend'
import { emailCompteActive } from '@/lib/emails/compte-active'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  if (!token) return NextResponse.json({ error: 'Token manquant' }, { status: 400 })

  const supabase = createAdminClient()

  // Trouver le profil avec ce token
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, nom, email, forfait, statut')
    .eq('validation_token', token)
    .single()

  if (error || !profile) {
    return NextResponse.json(
      { error: 'Token invalide ou déjà utilisé' },
      { status: 404 }
    )
  }

  if (profile.statut === 'actif') {
    return NextResponse.json({ message: 'Compte déjà actif', nom: profile.nom })
  }

  // Activer le compte
  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      statut: 'actif',
      validation_token: null, // invalider le token après usage
      date_activation: new Date().toISOString(),
    })
    .eq('id', profile.id)

  if (updateError) {
    console.error('[valider] Erreur activation:', updateError)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }

  // Email 3 : compte activé → utilisateur
  const loginUrl = `${APP_URL}/connexion`
  await resend.emails.send({
    from: FROM,
    to: profile.email,
    subject: '🎉 Votre compte PostFlow AI est activé — Connectez-vous maintenant !',
    html: emailCompteActive({
      nom: profile.nom,
      forfait: (profile.forfait ?? '').charAt(0).toUpperCase() + (profile.forfait ?? '').slice(1),
      loginUrl,
    }),
  })

  // Rediriger vers la page admin avec confirmation
  return NextResponse.redirect(
    `${APP_URL}/admin?success=1&nom=${encodeURIComponent(profile.nom)}`
  )
}
