import Link from 'next/link'

export const metadata = { title: 'Mentions légales — PostFlow AI' }

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-2xl font-black text-gray-900 block mb-10">
          Post<span className="text-brand-500">Flow</span> AI
        </Link>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Mentions légales</h1>
        <p className="text-gray-500 text-sm mb-10">Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique</p>

        <div className="space-y-8 text-gray-700 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Éditeur du site</h2>
            <p><strong>Nom commercial :</strong> PostFlow AI</p>
            <p className="mt-1"><strong>Nature :</strong> Service en ligne de génération de contenu pour réseaux sociaux</p>
            <p className="mt-1"><strong>Email de contact :</strong> <a href="mailto:dylanrivals7@gmail.com" className="text-brand-500 hover:underline">dylanrivals7@gmail.com</a></p>
            <p className="mt-1"><strong>Directeur de la publication :</strong> PostFlow AI</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Hébergement</h2>
            <p><strong>Hébergeur :</strong> Vercel Inc.</p>
            <p className="mt-1"><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
            <p className="mt-1"><strong>Site web :</strong> vercel.com</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Base de données</h2>
            <p><strong>Prestataire :</strong> Supabase Inc. (hébergement base de données)</p>
            <p className="mt-1"><strong>Serveur :</strong> Union européenne (Stockholm, Suède)</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Paiement</h2>
            <p><strong>Prestataire de paiement :</strong> Stripe Inc.</p>
            <p className="mt-1">Les données bancaires ne transitent pas par nos serveurs. Elles sont directement traitées par Stripe selon les normes PCI-DSS.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Propriété intellectuelle</h2>
            <p>L'ensemble du contenu présent sur ce site (textes, images, logos, structure) est protégé par les lois relatives à la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans autorisation expresse est interdite.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Cookies</h2>
            <p>Ce site utilise des cookies strictement nécessaires au fonctionnement du service (authentification, session). Aucun cookie de traçage publicitaire n'est utilisé.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Litiges</h2>
            <p>En cas de litige relatif à l'utilisation du site ou du service, vous pouvez contacter notre service client à <a href="mailto:dylanrivals7@gmail.com" className="text-brand-500 hover:underline">dylanrivals7@gmail.com</a> avant tout recours judiciaire.</p>
            <p className="mt-2">Conformément aux dispositions du Code de la consommation concernant le règlement amiable des litiges, PostFlow AI adhère au service du médiateur Medicys dont les coordonnées sont : www.medicys.fr.</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex gap-6 text-sm">
          <Link href="/cgu" className="text-brand-500 hover:underline">CGU</Link>
          <Link href="/confidentialite" className="text-brand-500 hover:underline">Politique de confidentialité</Link>
          <Link href="/" className="text-gray-500 hover:text-gray-700">← Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  )
}
