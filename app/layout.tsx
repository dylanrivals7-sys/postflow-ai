import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PostFlow AI — Génère tes posts LinkedIn, Instagram & TikTok en 30 secondes',
  description: 'PostFlow AI génère des posts percutants pour coaches et consultants francophones. Fini la page blanche.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-gray-700 antialiased">{children}</body>
    </html>
  )
}
