import Link from 'next/link'

export const metadata = { title: 'Politique de confidentialité — PostFlow AI' }

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-2xl font-black text-gray-900 block mb-10">
          Post<span className="text-brand-500">Flow</span> AI
        </Link>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Politique de confidentialité</h1>
        <p className="text-gray-500 text-sm mb-10">Dernière mise à jour : juin 2026 — Conforme au RGPD (Règlement UE 2016/679)</p>

        <div className="space-y-8 text-gray-700 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Responsable du traitement</h2>
            <p>PostFlow AI est responsable du traitement de vos données personnelles au sens du RGPD.</p>
            <p className="mt-1"><strong>Contact DPO :</strong> <a href="mailto:dylanrivals7@gmail.com" className="text-brand-500 hover:underline">dylanrivals7@gmail.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Données collectées</h2>
            <p>Lors de votre inscription et utilisation du service, nous collectons :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Données d'identification :</strong> nom, adresse email</li>
              <li><strong>Données de profil :</strong> type de profil (coach, consultant, agence), forfait souscrit</li>
              <li><strong>Données de facturation :</strong> traitées exclusivement par Stripe (nous ne stockons aucune donnée bancaire)</li>
              <li><strong>Données de navigation :</strong> cookies de session nécessaires au fonctionnement</li>
              <li><strong>Contenu généré :</strong> les prompts et posts générés via le service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Finalités du traitement</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Création et gestion de votre compte utilisateur</li>
              <li>Fourniture du service de génération de contenu</li>
              <li>Traitement de votre abonnement et facturation</li>
              <li>Communication relative à votre compte (activation, notifications)</li>
              <li>Amélioration du service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Base légale</h2>
            <p>Le traitement de vos données repose sur :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>L'exécution du contrat</strong> (art. 6.1.b RGPD) : pour la fourniture du service</li>
              <li><strong>Votre consentement</strong> (art. 6.1.a RGPD) : pour les communications marketing éventuelles</li>
              <li><strong>L'obligation légale</strong> (art. 6.1.c RGPD) : pour la conservation des données de facturation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Durée de conservation</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Données de compte :</strong> durée de l'abonnement + 3 ans après résiliation</li>
              <li><strong>Données de facturation :</strong> 10 ans (obligation légale comptable)</li>
              <li><strong>Cookies de session :</strong> durée de la session</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Destinataires des données</h2>
            <p>Vos données peuvent être partagées avec :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Supabase</strong> : hébergement et base de données (serveurs UE)</li>
              <li><strong>Stripe</strong> : traitement des paiements</li>
              <li><strong>Vercel</strong> : hébergement de l'application</li>
              <li><strong>Resend</strong> : envoi d'emails transactionnels</li>
            </ul>
            <p className="mt-2">Ces prestataires agissent en qualité de sous-traitants et sont soumis à des engagements de confidentialité. Aucune donnée n'est vendue à des tiers.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> vous opposer à certains traitements</li>
              <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
            </ul>
            <p className="mt-2">Pour exercer ces droits, contactez-nous à <a href="mailto:dylanrivals7@gmail.com" className="text-brand-500 hover:underline">dylanrivals7@gmail.com</a>. Nous répondons dans un délai d'un mois.</p>
            <p className="mt-2">Vous avez également le droit d'introduire une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">www.cnil.fr</a></p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Sécurité</h2>
            <p>Vos données sont protégées par des mesures techniques et organisationnelles appropriées : chiffrement HTTPS, authentification sécurisée, accès restreint aux données. Les mots de passe sont chiffrés et ne sont jamais stockés en clair.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Cookies</h2>
            <p>Ce site utilise uniquement des cookies strictement nécessaires au fonctionnement :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Cookie de session Supabase :</strong> maintien de votre connexion</li>
              <li><strong>Cookie admin_session :</strong> accès au panneau d'administration</li>
            </ul>
            <p className="mt-2">Aucun cookie publicitaire ou de traçage tiers n'est utilisé.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Contact</h2>
            <p>Pour toute question relative à vos données personnelles :<br />
            <a href="mailto:dylanrivals7@gmail.com" className="text-brand-500 hover:underline">dylanrivals7@gmail.com</a></p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex gap-6 text-sm">
          <Link href="/cgu" className="text-brand-500 hover:underline">CGU</Link>
          <Link href="/mentions-legales" className="text-brand-500 hover:underline">Mentions légales</Link>
          <Link href="/" className="text-gray-500 hover:text-gray-700">← Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  )
}
