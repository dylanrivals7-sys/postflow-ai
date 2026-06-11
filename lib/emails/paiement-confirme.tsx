export function emailPaiementConfirme({ nom, forfait, appUrl }: {
  nom: string; forfait: string; appUrl: string
}): string {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"/>
<style>
  body{margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,'Segoe UI',sans-serif}
  .w{max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .h{background:linear-gradient(135deg,#4f2fe0,#6c47ff);padding:40px;text-align:center}
  .logo{font-size:1.5rem;font-weight:900;color:#fff}
  .b{padding:40px;color:#374151;font-size:15px;line-height:1.7}
  .title{font-size:1.4rem;font-weight:800;color:#0f0e17;margin-bottom:8px}
  .box{background:#fafafa;border:1px solid #e5e7eb;border-radius:12px;padding:20px 24px;margin:24px 0}
  .f{padding:24px 40px;background:#f9fafb;border-top:1px solid #f0f0f0;font-size:12px;color:#9ca3af;text-align:center}
  a{color:#6c47ff}
</style></head>
<body><div class="w">
  <div class="h"><div class="logo">PostFlow AI</div></div>
  <div class="b">
    <p class="title">Paiement reçu ✅</p>
    <p>Bonjour <strong>${nom}</strong>,</p>
    <p>Nous avons bien reçu ton paiement pour le plan <strong>${forfait}</strong>. Merci !</p>
    <div class="box">
      <strong>⏳ Ton compte est en cours de validation</strong>
      <p style="margin:8px 0 0;font-size:14px;color:#6b7280">
        Ton accès PostFlow AI sera activé sous <strong>24h</strong>.
        Tu recevras un email dès que ton compte est actif — aucune action de ta part n'est nécessaire.
      </p>
    </div>
    <p>En attendant, si tu as la moindre question, réponds directement à cet email.</p>
    <p style="margin-top:32px">À très vite,<br/><strong>L'équipe PostFlow AI</strong></p>
  </div>
  <div class="f">PostFlow AI · <a href="${appUrl}">${appUrl}</a></div>
</div></body></html>`
}
