export function emailCompteActive({ nom, forfait, loginUrl }: {
  nom: string; forfait: string; loginUrl: string
}): string {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"/>
<style>
  body{margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,'Segoe UI',sans-serif}
  .w{max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .h{background:linear-gradient(135deg,#4f2fe0,#6c47ff);padding:40px;text-align:center}
  .logo{font-size:1.5rem;font-weight:900;color:#fff}
  .emoji{font-size:3rem;margin-top:8px}
  .b{padding:40px;color:#374151;font-size:15px;line-height:1.7}
  .title{font-size:1.5rem;font-weight:900;color:#0f0e17;margin-bottom:4px}
  .sub{font-size:1rem;color:#6b7280;margin-bottom:24px}
  .plan{display:inline-block;background:#f0ecff;color:#6c47ff;font-weight:700;font-size:14px;padding:6px 16px;border-radius:999px;margin-bottom:24px}
  .feats{background:#fafafa;border:1px solid #e5e7eb;border-radius:12px;padding:20px 24px;margin:20px 0}
  .feats ul{margin:8px 0 0;padding-left:20px}
  .feats li{font-size:14px;color:#4b5563;margin-bottom:6px}
  .cta{display:block;background:#6c47ff;color:#fff!important;text-align:center;text-decoration:none;font-weight:700;font-size:16px;padding:18px 32px;border-radius:12px;margin:28px 0}
  .f{padding:24px 40px;background:#f9fafb;border-top:1px solid #f0f0f0;font-size:12px;color:#9ca3af;text-align:center}
  a{color:#6c47ff}
</style></head>
<body><div class="w">
  <div class="h">
    <div class="logo">PostFlow AI</div>
    <div class="emoji">🎉</div>
  </div>
  <div class="b">
    <p class="title">Ton compte est activé !</p>
    <p class="sub">Bienvenue dans la famille PostFlow AI, ${nom} 👋</p>
    <div class="plan">Plan ${forfait} activé</div>
    <p>Tout est prêt. Tu peux maintenant générer tes premiers posts LinkedIn, Instagram et TikTok en moins de 30 secondes. 🚀</p>
    <div class="feats">
      <strong>✨ Ce qui t'attend dans ton dashboard :</strong>
      <ul>
        <li>Génération de posts en 30 secondes chrono</li>
        <li>Adaptation automatique par plateforme</li>
        <li>Hashtags optimisés pour l'algorithme</li>
        <li>Ton de voix personnalisé à ta niche</li>
      </ul>
    </div>
    <a href="${loginUrl}" class="cta">→ Se connecter à mon dashboard</a>
    <p style="font-size:13px;color:#9ca3af">Si le bouton ne fonctionne pas : <a href="${loginUrl}">${loginUrl}</a></p>
  </div>
  <div class="f">PostFlow AI · Des questions ? Réponds directement à cet email.</div>
</div></body></html>`
}
