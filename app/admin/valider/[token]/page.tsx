import { redirect } from 'next/navigation'

// Cette page redirige immédiatement vers la route API de validation
export default function ValiderPage({ params }: { params: { token: string } }) {
  redirect(`/api/admin/valider/${params.token}`)
}
