'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const PLANS = [
  {
    key: 'starter',
    name: 'Starter',
    price: 19,
    tagline: 'Pour commencer à publier régulièrement',
    features: [
      { ok: true,  text: '30 posts générés / mois' },
      { ok: true,  text: 'LinkedIn + Instagram' },
      { ok: true,  text: '5 tons de voix disponibles' },
      { ok: true,  text: 'Suggestions de hashtags' },
      { ok: false, text: 'TikTok scripts' },
      { ok: false, text: 'Calendrier éditorial IA' },
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 39,
    tagline: 'Pour scaler ta visibilité',
    popular: true,
    features: [
      { ok: true, text: 'Posts illimités' },
      { ok: true, text: 'LinkedIn + Instagram + TikTok' },
      { ok: true, text: '20 tons + ton personnalisé' },
      { ok: true, text: 'Calendrier éditorial IA (30 jours)' },
      { ok: true, text: 'Export PDF / Notion / Buffer' },
      { ok: false, text: 'Gestion multi-clients' },
    ],
  },
  {
    key: 'agence',
    name: 'Agence',
    price: 79,
    tagline: 'Pour les agences et coachs multi-clients',
    features: [
      { ok: true, text: 'Tout le plan Pro' },
      { ok: true, text: "Jusqu'à 10 espaces clients" },
      { ok: true, text: 'Marque blanche disponible' },
      { ok: true, text: 'Accès équipe (3 utilisateurs)' },
      { ok: true, text: 'Support prioritaire 7j/7' },
      { ok: true, text: 'Onboarding personnalisé' },
    ],
  },
]

const TESTIMONIALS = [
  {
    name: 'Marie Lambert',
    role: 'Coach business · Lyon',
    text: "Avant PostFlow AI, je passais 3h le dimanche à rédiger mes posts LinkedIn. Maintenant c'est 10 minutes. Mon taux d'engagement a doublé en 6 semaines.",
    stat: '+240% d\'engagement',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=96&h=96&q=80',
  },
  {
    name: 'Thomas Roussel',
    role: 'Consultant RH · Paris',
    text: "J'étais sceptique sur l'IA pour créer du contenu \"authentique\". Mais PostFlow AI capture vraiment mon style. Mes clients me disent que mes posts sont de mieux en mieux.",
    stat: '3h économisées / semaine',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=96&h=96&q=80',
  },
  {
    name: 'Sophie Martin',
    role: 'Agence digitale · Bordeaux',
    text: "On gère 8 clients avec PostFlow AI. Avant, ça nous prenait une semaine entière pour produire tout le contenu mensuel. Maintenant c'est fait en 2 jours.",
    stat: '8 clients gérés',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=96&h=96&q=80',
  },
]

const FAQS = [
  {
    q: "Est-ce que les posts générés me ressemblent vraiment ?",
    a: "Oui. Plus tu utilises PostFlow AI, plus il apprend ton style. Dès la première utilisation, tu choisis parmi 20 tons de voix et tu décris ta personnalité. La plupart des utilisateurs ne retouchent plus leurs posts après 2 semaines."
  },
  {
    q: "Comment fonctionne l'essai gratuit de 7 jours ?",
    a: "Tu crées ton compte, tu entres tes informations de paiement (aucun débit pendant 7 jours), et tu accèdes immédiatement à toutes les fonctionnalités. Si tu ne veux pas continuer, annule avant la fin de la période d'essai."
  },
  {
    q: "Pourquoi mon compte n'est pas actif immédiatement ?",
    a: "Pour garantir la qualité de notre service, nous validons chaque compte manuellement sous 1 à 2 jours ouvrés. Tu recevras un email dès que ton accès est ouvert — généralement le jour même."
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, sans question ni friction. Tu annules en 2 clics depuis ton compte. Remboursement intégral sous 14 jours si insatisfait."
  },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="text-xl font-black text-gray-900">
            Post<span className="text-brand-500">Flow</span> AI
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[['#comment', 'Comment ça marche'], ['#tarifs', 'Tarifs'], ['#avis', 'Avis'], ['#faq', 'FAQ']].map(([href, label]) => (
              <a key={href} href={href} className="text-sm font-medium text-gray-600 hover:text-brand-500 transition-colors">{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/connexion" className="text-sm font-semibold text-gray-600 hover:text-brand-500 transition-colors">Se connecter</Link>
            <Link href="/inscription" className="btn-primary text-sm py-2 px-4">Essayer gratuitement</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-slate-50 via-brand-50 to-purple-50 pt-24 pb-20 overflow-hidden relative">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-500/8 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
              ⚡ Alimenté par l'IA
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.12] mb-5">
              Arrête de passer{' '}
              <span className="text-brand-500">3h par semaine</span>{' '}
              à créer tes posts.<br />
              PostFlow AI le fait en{' '}
              <span className="text-brand-500">30 secondes</span>.
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-md">
              Génère des posts LinkedIn, Instagram et TikTok percutants,
              adaptés à ta niche de coach ou consultant — sans page blanche, sans effort.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/inscription" className="btn-primary">
                Commencer — 7 jours gratuits →
              </Link>
              <a href="#tarifs" className="btn-outline">Voir les tarifs</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=32&h=32&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&q=80',
                ].map((src, i) => (
                  <Image key={i} src={src} alt="" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div className="text-sm text-gray-500">
                <span className="text-yellow-400">★★★★★</span> · <strong>+2 400 coaches</strong> utilisent PostFlow AI
              </div>
            </div>
          </div>

          {/* Hero image + mockup */}
          <div className="relative">
            {/* Photo de coach */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-500/20 border border-gray-200 mb-4">
              <Image
                src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&h=380&q=80"
                alt="Coach créant du contenu avec PostFlow AI"
                width={600}
                height={380}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur rounded-xl p-3 text-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 rounded bg-[#0A66C2] flex items-center justify-center text-white font-bold text-[9px]">in</div>
                    <span className="font-bold text-gray-800">LinkedIn · 1 heure</span>
                    <span className="ml-auto text-green-600 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Live</span>
                  </div>
                  <p className="text-gray-600 text-[11px] leading-relaxed">
                    <strong className="text-gray-900">💡 Tu veux tes premiers clients mais tu n'as "aucun réseau" ?</strong><br />
                    Le réseau ne se construit pas avant de se lancer. Il se construit EN se lançant...
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
                    <span>👍 847 réactions</span>
                    <span>💬 134 commentaires</span>
                    <span>↗ 298 partages</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 -left-4 bg-white rounded-xl px-3 py-2 shadow-lg text-xs font-semibold text-green-600 flex items-center gap-1.5 border border-gray-100">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Généré en 28 secondes
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-xl px-3 py-2 shadow-lg text-xs font-semibold text-brand-600 border border-gray-100">
              🔥 Viralité estimée : 94%
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATEFORMES ── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Compatible avec tes plateformes préférées</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {/* LinkedIn */}
            <div className="flex items-center gap-2.5 text-gray-600 hover:text-[#0A66C2] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#0A66C2] flex items-center justify-center shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <span className="font-bold text-base">LinkedIn</span>
            </div>
            {/* Instagram */}
            <div className="flex items-center gap-2.5 text-gray-600 hover:text-pink-600 transition-colors">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm" style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <span className="font-bold text-base">Instagram</span>
            </div>
            {/* TikTok */}
            <div className="flex items-center gap-2.5 text-gray-600 hover:text-gray-900 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z"/></svg>
              </div>
              <span className="font-bold text-base">TikTok</span>
            </div>
            {/* X / Twitter */}
            <div className="flex items-center gap-2.5 text-gray-600 hover:text-gray-900 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
              <span className="font-bold text-base">X / Twitter</span>
            </div>
            {/* Facebook */}
            <div className="flex items-center gap-2.5 text-gray-600 hover:text-[#1877F2] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <span className="font-bold text-base">Facebook</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-brand-500">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { n: '+2 400', label: 'Coachs & consultants' },
              { n: '30 sec', label: 'Pour générer un post' },
              { n: '+180%', label: "D'engagement moyen" },
              { n: '3h/sem', label: 'Économisées en moyenne' },
            ].map(s => (
              <div key={s.n}>
                <div className="text-3xl md:text-4xl font-black mb-1">{s.n}</div>
                <div className="text-white/70 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLÈME ── */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">Le problème</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Créer du contenu est épuisant.<br />Et pourtant, c'est vital.</h2>
              <p className="text-gray-400 mb-8 max-w-lg">Tu sais que la visibilité attire des clients. Mais entre tes sessions, tes formations et ta vie, trouver du temps pour les réseaux sociaux c'est un combat quotidien.</p>
              <div className="space-y-4">
                {[
                  { icon: '⏳', title: 'La page blanche te paralyse', text: "Tu passes plus de temps à fixer l'écran qu'à écrire." },
                  { icon: '📉', title: 'Tu postes en ordre dispersé', text: "L'algorithme te pénalise, ton audience ne te suit plus." },
                  { icon: '🎭', title: 'Tu ne sais pas quoi dire', text: "Transformer ta valeur en contenu engageant prend des mois." },
                ].map(p => (
                  <div key={p.title} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                    <span className="text-2xl flex-shrink-0">{p.icon}</span>
                    <div>
                      <div className="text-white font-bold text-sm mb-0.5">{p.title}</div>
                      <div className="text-gray-400 text-sm">{p.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&h=700&q=80"
                alt="Entrepreneur face à la page blanche"
                width={600}
                height={700}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 text-white text-sm">
                <div className="font-bold mb-1">😩 Dimanche 22h</div>
                <div className="text-white/70">"Je dois poster demain mais j'ai aucune idée de quoi écrire..."</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section id="comment" className="py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">Simplicité absolue</div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">3 étapes. 30 secondes. 1 post parfait.</h2>
          <p className="text-gray-500 mb-14 max-w-md mx-auto">Pas de formation, pas d'apprentissage. Tu décris ton idée, PostFlow AI fait le reste.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: 1,
                title: 'Décris ton idée',
                text: "Donne ta niche, le sujet du post et la plateforme cible. Pas besoin d'être précis.",
                img: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=400&h=260&q=80',
                alt: 'Personne qui tape sur ordinateur',
              },
              {
                n: 2,
                title: "L'IA génère en 30 secondes",
                text: "PostFlow AI rédige un post optimisé pour l'algorithme, avec le bon format, ton et hashtags.",
                img: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?auto=format&fit=crop&w=400&h=260&q=80',
                alt: "Interface d'intelligence artificielle",
              },
              {
                n: 3,
                title: 'Publie directement',
                text: "Copie le post en un clic, ajuste si tu veux, et programme ta publication.",
                img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&h=260&q=80',
                alt: 'Partage sur réseaux sociaux',
              },
            ].map(s => (
              <div key={s.n} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="relative">
                  <Image src={s.img} alt={s.alt} width={400} height={260} className="w-full object-cover h-[200px]" />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-brand-500 text-white font-black flex items-center justify-center text-lg shadow-lg shadow-brand-500/40">{s.n}</div>
                </div>
                <div className="p-5 text-left">
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXEMPLE DE POST ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">Résultats réels</div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">Ce que PostFlow AI génère pour toi</h2>
            <p className="text-gray-500">Des posts qui performent sur chaque plateforme</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* LinkedIn post */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0A66C2] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">LinkedIn</div>
                  <div className="text-xs text-gray-400">Post professionnel</div>
                </div>
                <span className="ml-auto text-xs bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-md">+847 👍</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed border-l-2 border-[#0A66C2] pl-3">
                <strong>💡 Tu veux tes premiers clients mais tu n'as "aucun réseau" ?</strong><br /><br />
                Mauvaise nouvelle : le réseau ne se construit pas avant de se lancer.<br />
                Il se construit EN se lançant.<br /><br />
                ✅ Publier du contenu utile dès le jour 1<br />
                ✅ Commenter les posts de tes clients idéaux<br />
                ✅ Envoyer 3 DMs personnalisés par jour
              </p>
              <div className="flex gap-1.5 mt-3">
                {['#coaching', '#freelance', '#linkedin'].map(t => (
                  <span key={t} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </div>
            {/* Instagram post */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=400&h=300&q=80"
                  alt="Post Instagram coach"
                  width={400}
                  height={300}
                  className="w-full object-cover h-[180px]"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-white/90 backdrop-blur px-2 py-1 rounded-lg">
                  <div className="w-5 h-5 rounded" style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'}} />
                  <span className="text-xs font-bold">Instagram</span>
                </div>
                <div className="absolute top-2 right-2 text-xs bg-pink-50 text-pink-600 font-bold px-2 py-0.5 rounded-md border border-pink-100">+1.2k ❤️</div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>3 erreurs qui bloquent tes revenus 💸</strong><br /><br />
                  J'ai coaché +200 entrepreneurs. Ces erreurs reviennent TOUJOURS...
                </p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {['#entrepreneur', '#coaching', '#business', '#mindset'].map(t => (
                    <span key={t} className="text-[10px] text-pink-500">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* TikTok script */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z"/></svg>
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">TikTok</div>
                  <div className="text-xs text-gray-400">Script vidéo</div>
                </div>
                <span className="ml-auto text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-md">+12k 👁</span>
              </div>
              <div className="space-y-2">
                {[
                  { t: '0:00', txt: '🎯 Hook : "Si tu fais encore ça en 2024..."' },
                  { t: '0:05', txt: '📌 Problème : La majorité des coachs ratent cette étape clé' },
                  { t: '0:20', txt: '💡 Solution : Les 3 étapes exactes que j\'utilise' },
                  { t: '0:45', txt: '🚀 CTA : "Commente GUIDE pour recevoir..."' },
                ].map(l => (
                  <div key={l.t} className="flex items-start gap-2 text-xs">
                    <span className="text-gray-400 font-mono flex-shrink-0 mt-0.5">{l.t}</span>
                    <span className="text-gray-700">{l.txt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section id="avis" className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">Ils l'utilisent chaque jour</div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">+2 400 pros nous font confiance</h2>
            <div className="flex items-center justify-center gap-1 text-yellow-400 text-lg mb-2">★★★★★</div>
            <p className="text-gray-500">Note moyenne : 4.9/5 sur 840 avis</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex text-yellow-400 mb-4 text-sm">★★★★★</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="bg-brand-50 rounded-xl px-3 py-2 text-xs font-bold text-brand-600 mb-4 inline-block">{t.stat}</div>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover border-2 border-brand-100"
                  />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Bandeau photos */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-6 py-4 border border-gray-200">
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=40&h=40&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&q=80',
                ].map((src, i) => (
                  <Image key={i} src={src} alt="" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <strong className="text-gray-900">+2 400 coachs</strong> ont rejoint cette semaine
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section id="tarifs" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">Tarifs transparents</div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Investis moins que le prix d'un café par jour</h2>
            <p className="text-gray-500">Sans engagement · 7 jours d'essai gratuit · Annulable en 2 clics</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10 max-w-2xl mx-auto flex gap-3">
            <span className="text-2xl flex-shrink-0">ℹ️</span>
            <p className="text-sm text-amber-800">
              <strong>Comment ça fonctionne :</strong> Après votre paiement, votre compte sera activé
              sous <strong>1 à 2 jours ouvrés</strong> après validation manuelle de notre équipe.
              Vous recevrez un email de confirmation dès que votre accès est ouvert.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map(plan => (
              <div key={plan.key} className={`relative bg-white rounded-2xl border-2 p-7 transition-all duration-200 hover:-translate-y-1 ${plan.popular ? 'border-brand-500 shadow-xl shadow-brand-500/15 -translate-y-2' : 'border-gray-200 hover:shadow-md'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    ⭐ Le plus populaire
                  </div>
                )}
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{plan.name}</div>
                <div className="text-5xl font-black text-gray-900 mb-1">
                  <sup className="text-2xl font-bold">€</sup>{plan.price}<sub className="text-base font-medium text-gray-400">/mois</sub>
                </div>
                <p className="text-sm text-gray-500 mb-6">{plan.tagline}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f.text} className="flex items-start gap-2.5 text-sm">
                      <span className={f.ok ? 'text-emerald-500 font-bold mt-0.5' : 'text-gray-300 mt-0.5'}>
                        {f.ok ? '✓' : '✗'}
                      </span>
                      <span className={f.ok ? 'text-gray-700' : 'text-gray-300'}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/inscription?forfait=${plan.key}`}
                  className={`w-full flex items-center justify-center py-3 rounded-xl font-bold text-sm transition-all duration-150 ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                >
                  Essayer 7 jours gratuits
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            💳 Paiement sécurisé par Stripe · 🔒 Sans engagement · ↩️ Remboursement sous 14 jours
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">Questions fréquentes</div>
            <h2 className="text-3xl font-black text-gray-900">Tout ce que tu veux savoir</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className={`text-brand-500 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&h=600&q=80"
            alt="Équipe de coachs"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-600/90" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Prêt·e à arrêter de perdre du temps sur tes posts ?
          </h2>
          <p className="text-white/75 text-lg mb-10">
            Rejoins +2 400 coaches et consultants qui publient plus, mieux, et sans effort.
          </p>
          <Link href="/inscription" className="inline-flex items-center gap-2 bg-white text-brand-600 font-bold px-8 py-4 rounded-2xl text-base hover:scale-105 transition-transform shadow-2xl">
            Commencer gratuitement — 7 jours offerts →
          </Link>
          <p className="text-white/50 text-xs mt-4">Aucune carte bancaire · Annulation en 1 clic · RGPD</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
          <div className="text-white font-black text-lg">Post<span className="text-brand-400">Flow</span> AI</div>
          <div className="flex gap-6 flex-wrap text-sm text-gray-400">
            {['Mentions légales', 'CGV', 'Confidentialité', 'Contact'].map(l => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
          <div className="text-gray-500 text-sm">© 2025 PostFlow AI</div>
        </div>
      </footer>
    </div>
  )
}
