export function emailAdminNotification({ nom, email, forfait, typeProfile, validationUrl, dateInscription }: {
  nom: string; email: string; forfait: string; typeProfile: string; validationUrl: string; dateInscription: string
}): string {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"/>
<style>
  body{margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,'Segoe UI',sans-serif}
  .w{max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .h{background:#0f0e17;padding:32px 40px;display:flex;justify-content:space-between;align-items:center}
  .logo{font-size:1.3rem;font-weight:900;color:#fff}
  .badge{background:#fbbf24;color:#78350f;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px}
  .b{padding:40px;color:#374151;font-size:15px;line-height:1.7}
  .title{font-size:1.3rem;font-weight:800;color:#0f0e17;margin-bottom:16px}
  .row{display:flex;gap:12px;margin:8px 0}
  .cell{flex:1;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px}
  .label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#9ca3af;margin-bottom:4px}
  .val{font-size:15px;font-weight:600;color:#111827}
  .cta{display:block;background:#6c47ff;color:#fff!important;text-align:center;text-decoration:none;font-weight:700;font-size:16px;padding:16px 32px;border-radius:12px;margin:28px 0}
  .warn{background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 16px;font-size:13px;color:#92400e}
  .f{padding:24px 40px;background:#f9fafb;border-top:1px solid #f0f0f0;font-size:12px;color:#9ca3af;text-align:center}
</style></head>
<body><div class="w">
  <div class="h">
    <div class="logo">PostFlow AI — Admin</div>
    <div class="badge">Nouveau paiement</div>
  </div>
  <div class="b">
    <div class="title">💳 Nouveau paiement reçu</div>
    <div class="row">
      <div class="cell"><div class="label">Nom</div><div class="val">${nom}</div></div>
      <div class="cell"><div class="label">Email</div><div class="val">${email}</div></div>
    </div>
    <div class="row">
      <div class="cell"><div class="label">Forfait</div><div class="val" style="color:#6c47ff">Plan ${forfait}</div></div>
      <div class="cell"><div class="label">Type de profil</div><div class="val">${typeProfile}</div></div>
    </div>
    <div class="row">
      <div class="cell" style="flex:1"><div class="label">Date d'inscription</div><div class="val">${dateInscription}</div></div>
    </div>
    <p>Clique sur le bouton ci-dessous pour activer le compte :</p>
    <a href="${validationUrl}" class="cta">✅ Activer le compte de ${nom}</a>
    <div class="warn">⚠️ Ce lien est à usage unique. Une fois activé, l'utilisateur reçoit automatiquement un email de confirmation.</div>
  </div>
  <div class="f">PostFlow AI Admin — Lien de validation direct</div>
</div></body></html>`
}
