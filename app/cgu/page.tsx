import Link from 'next/link'

export const metadata = { title: 'CGU — PostFlow AI' }

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-2xl font-black text-gray-900 block mb-10">
          Post<span className="text-brand-500">Flow</span> AI
        </Link>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Conditions Générales d'Utilisation</h1>
        <p className="text-gray-500 text-sm mb-10">Dernière mise à jour : juin 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Présentation du service</h2>
            <p>PostFlow AI est un service en ligne de génération de contenu pour les réseaux sociaux (LinkedIn, Instagram, TikTok et autres), exploité sous le nom commercial PostFlow AI. Le service est actuellement en phase d'accès anticipé (bêta).</p>
            <p className="mt-2">Contact : <a href="mailto:dylanrivals7@gmail.com" className="text-brand-500 hover:underline">dylanrivals7@gmail.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Acceptation des conditions</h2>
            <p>L'utilisation du service PostFlow AI implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser le service. En cochant la case d'acceptation lors de votre inscription, vous reconnaissez avoir lu, compris et accepté les présentes CGU.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Description du service</h2>
            <p>PostFlow AI propose un accès à un outil de génération de posts pour les réseaux sociaux alimenté par l'intelligence artificielle. Le service est proposé en mode abonnement mensuel avec les forfaits suivants :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Starter</strong> : 19 €/mois</li>
              <li><strong>Pro</strong> : 39 €/mois</li>
              <li><strong>Agence</strong> : 79 €/mois</li>
            </ul>
            <p className="mt-2">Le service est en phase bêta. Certaines fonctionnalités peuvent être indisponibles ou modifiées sans préavis. Les prix peuvent évoluer avec un préavis de 30 jours.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Inscription et activation du compte</h2>
            <p>L'accès au service nécessite la création d'un compte et le règlement de l'abonnement choisi. Chaque compte est soumis à une validation manuelle par notre équipe. L'activation intervient généralement sous 24 heures après réception du paiement.</p>
            <p className="mt-2">L'utilisateur s'engage à fournir des informations exactes lors de son inscription et à maintenir la confidentialité de ses identifiants de connexion.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Abonnement et facturation</h2>
            <p>Le paiement est effectué via Stripe, prestataire de paiement sécurisé. L'abonnement est renouvelé automatiquement chaque mois à la date anniversaire de l'inscription.</p>
            <p className="mt-2">L'utilisateur peut annuler son abonnement à tout moment depuis son espace client. L'annulation prend effet à la fin de la période en cours. Aucun remboursement au prorata n'est accordé en cas d'annulation en cours de mois, sauf demande expresse adressée à <a href="mailto:dylanrivals7@gmail.com" className="text-brand-500 hover:underline">dylanrivals7@gmail.com</a> dans les 14 jours suivant le paiement.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Droit de rétractation</h2>
            <p>Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un délai de 14 jours à compter de votre inscription pour exercer votre droit de rétractation, sans avoir à justifier de motif. Pour exercer ce droit, contactez-nous à <a href="mailto:dylanrivals7@gmail.com" className="text-brand-500 hover:underline">dylanrivals7@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Propriété intellectuelle</h2>
            <p>Le contenu généré par PostFlow AI à partir des instructions de l'utilisateur appartient à l'utilisateur. L'utilisateur est seul responsable de l'utilisation du contenu généré et de sa conformité avec les règles des plateformes sociales concernées et la législation en vigueur.</p>
            <p className="mt-2">L'interface, le code et les marques PostFlow AI restent la propriété exclusive de leurs auteurs.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Limitation de responsabilité</h2>
            <p>PostFlow AI est un outil d'aide à la création de contenu. Les résultats obtenus (engagement, visibilité, acquisition de clients) ne peuvent être garantis. PostFlow AI ne saurait être tenu responsable des décisions commerciales prises sur la base du contenu généré.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Modifications des CGU</h2>
            <p>PostFlow AI se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés par email de tout changement substantiel. La poursuite de l'utilisation du service après modification vaut acceptation des nouvelles conditions.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Droit applicable</h2>
            <p>Les présentes CGU sont soumises au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, le litige sera soumis aux tribunaux compétents du ressort du siège social de PostFlow AI.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">11. Contact</h2>
            <p>Pour toute question relative aux présentes CGU : <a href="mailto:dylanrivals7@gmail.com" className="text-brand-500 hover:underline">dylanrivals7@gmail.com</a></p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex gap-6 text-sm">
          <Link href="/mentions-legales" className="text-brand-500 hover:underline">Mentions légales</Link>
          <Link href="/confidentialite" className="text-brand-500 hover:underline">Politique de confidentialité</Link>
          <Link href="/" className="text-gray-500 hover:text-gray-700">← Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  )
}
