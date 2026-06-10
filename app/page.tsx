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
            {[['#comment', 'Comment ça marche'], ['#tarifs', 'Tarifs'], ['#faq', 'FAQ']].map(([href, label]) => (
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
                {['ML','SC','AB','TP','JD'].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-brand-400 flex items-center justify-center text-white text-xs font-bold">{i}</div>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                <span className="text-yellow-400">★★★★★</span> · <strong>+2 400 coaches</strong> utilisent PostFlow AI
              </div>
            </div>
          </div>

          {/* Mockup */}
          <div className="relative">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-brand-500/15 overflow-hidden">
              <div className="bg-gray-100 flex items-center gap-1.5 px-4 py-3 border-b border-gray-200">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-gray-400 font-medium">PostFlow AI — Générateur</span>
              </div>
              <div className="p-5">
                <div className="bg-gray-50 rounded-xl p-3 mb-3 text-xs text-gray-600">
                  <span className="block text-brand-500 font-bold uppercase tracking-wider text-[10px] mb-1">Ta niche & idée</span>
                  "Coach business pour freelances — comment décrocher ses premiers clients sans réseau"
                </div>
                <div className="border-l-2 border-brand-500 pl-3 text-sm text-gray-700 leading-relaxed mb-3">
                  <strong>💡 Tu veux tes premiers clients mais tu n'as "aucun réseau" ?</strong><br /><br />
                  Mauvaise nouvelle : le réseau ne se construit pas avant de se lancer.<br />
                  Il se construit EN se lançant.<br /><br />
                  1. Publier du contenu utile dès le jour 1<br />
                  2. Commenter les posts de tes clients idéaux<br />
                  3. Envoyer 3 DMs personnalisés par jour
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['LinkedIn','Hook puissant','Liste & tips','CTA inclus'].map(t => (
                    <span key={t} className="text-[11px] bg-brand-50 text-brand-600 font-semibold px-2 py-0.5 rounded-md">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-3 py-2 shadow-lg text-xs font-semibold text-green-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Généré en 28 secondes
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-xl px-3 py-2 shadow-lg text-xs font-semibold text-brand-600">
              🔥 Viralité estimée : 94%
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLÈME ── */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <div className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">Le problème</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Créer du contenu est épuisant.<br />Et pourtant, c'est vital.</h2>
            <p className="text-gray-400 max-w-lg">Tu sais que la visibilité attire des clients. Mais entre tes sessions, tes formations et ta vie, trouver du temps pour les réseaux sociaux c'est un combat quotidien.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '⏳', title: 'La page blanche te paralyse', text: "Tu passes plus de temps à fixer l'écran qu'à écrire. L'inspiration ne vient pas à la commande, surtout quand tu es épuisé après une journée de coaching." },
              { icon: '📉', title: 'Tu postes en ordre dispersé', text: "Quelques posts cette semaine, silence pendant 10 jours. L'algorithme te pénalise, ton audience ne te suit plus, et les prospects ne te connaissent pas." },
              { icon: '🎭', title: 'Tu ne sais pas quoi dire', text: "Tu as de la valeur à partager, mais la transformer en contenu engageant adapté à chaque plateforme… c'est une compétence qui prend des mois à maîtriser." },
            ].map(p => (
              <div key={p.title} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 transition-colors">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section id="comment" className="py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">Simplicité absolue</div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">3 étapes. 30 secondes. 1 post parfait.</h2>
          <p className="text-gray-500 mb-14 max-w-md mx-auto">Pas de formation, pas d'apprentissage. Tu décris ton idée, PostFlow AI fait le reste.</p>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-500 to-brand-300" />
            {[
              { n: 1, title: 'Décris ton idée en une phrase', text: "Donne ta niche, le sujet du post et la plateforme cible. Pas besoin d'être précis." },
              { n: 2, title: "L'IA génère ton post en 30 secondes", text: "PostFlow AI rédige un post optimisé pour l'algorithme, avec le bon format, ton et hashtags." },
              { n: 3, title: 'Publie directement ou affine', text: "Copie le post en un clic, ajuste si tu veux, et programme ta publication. C'est tout." },
            ].map(s => (
              <div key={s.n} className="flex flex-col items-center text-center relative z-10">
                <div className="w-14 h-14 rounded-full bg-brand-500 text-white text-xl font-black flex items-center justify-center mb-5 shadow-lg shadow-brand-500/40">{s.n}</div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.text}</p>
              </div>
            ))}
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

          {/* Message validation */}
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
      <section className="py-24 bg-gradient-to-r from-brand-700 via-brand-500 to-brand-400">
        <div className="max-w-3xl mx-auto px-4 text-center">
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
          <div className="text-gray-500 text-sm">© 2024 PostFlow AI</div>
        </div>
      </footer>
    </div>
  )
}
