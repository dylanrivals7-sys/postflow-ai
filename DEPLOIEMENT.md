# 🚀 Guide de déploiement PostFlow AI

## 1. SUPABASE — Base de données & Auth

### Créer le projet
1. Va sur https://supabase.com → New Project
2. Choisis un nom, un mot de passe fort, et une région (eu-central-1 pour l'Europe)
3. Attends ~2 minutes que le projet soit créé

### Configurer la base de données
1. Va dans **SQL Editor** → New Query
2. Copie-colle tout le contenu de `supabase/schema.sql`
3. Clique **Run** — tu dois voir "Success"

### Récupérer les clés
Va dans **Settings → API** :
- `NEXT_PUBLIC_SUPABASE_URL` = Project URL (ex: https://abc123.supabase.co)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
- `SUPABASE_SERVICE_ROLE_KEY` = service_role key ⚠️ ne jamais exposer côté client

### Configurer l'Auth
- Va dans **Authentication → Settings**
- Désactive "Enable email confirmations" si tu veux un accès immédiat après signup
  (ou laisse activé si tu veux une confirmation email — adapte le flux en conséquence)
- Dans **Authentication → URL Configuration** :
  - Site URL : `https://ton-domaine.com`
  - Redirect URLs : `https://ton-domaine.com/auth/callback`

---

## 2. STRIPE — Paiements

### Créer les produits
1. Va sur https://dashboard.stripe.com → Products → Add product
2. Crée **3 produits** :

   **Starter**
   - Nom : PostFlow AI Starter
   - Prix : 19,00 EUR, récurrent mensuel
   - Copie le Price ID (price_xxx) → `STRIPE_PRICE_STARTER`

   **Pro**
   - Nom : PostFlow AI Pro
   - Prix : 39,00 EUR, récurrent mensuel
   - Copie le Price ID → `STRIPE_PRICE_PRO`

   **Agence**
   - Nom : PostFlow AI Agence
   - Prix : 79,00 EUR, récurrent mensuel
   - Copie le Price ID → `STRIPE_PRICE_AGENCE`

### Clé secrète
- Dashboard Stripe → Developers → API keys
- Copie la **Secret key** (sk_live_xxx en prod, sk_test_xxx en test)
- → `STRIPE_SECRET_KEY`

### Configurer le Webhook
1. Dashboard Stripe → Developers → Webhooks → Add endpoint
2. URL : `https://ton-domaine.com/api/stripe/webhook`
3. Events à écouter :
   - `checkout.session.completed`
   - `customer.subscription.deleted`
4. Copie le **Signing secret** (whsec_xxx) → `STRIPE_WEBHOOK_SECRET`

> En développement local, utilise le Stripe CLI :
> ```bash
> stripe listen --forward-to localhost:3000/api/stripe/webhook
> ```

---

## 3. RESEND — Emails transactionnels

1. Crée un compte sur https://resend.com
2. **API Keys** → Create API Key → copie → `RESEND_API_KEY`
3. **Domains** → Add domain → entre ton domaine → suis les instructions DNS
   (ajoute les records MX/TXT dans ton registrar — Cloudflare, Namecheap, etc.)
4. Une fois le domaine vérifié :
   - `RESEND_FROM_EMAIL` = `PostFlow AI <bonjour@ton-domaine.com>`
5. `ADMIN_EMAIL` = ton email personnel (où tu recevras les notifs de paiement)

---

## 4. VERCEL — Déploiement

### Déployer
1. Push ton code sur GitHub :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TON_USER/postflow-ai.git
   git push -u origin main
   ```

2. Va sur https://vercel.com → New Project → importe ton repo GitHub

3. **Configure les variables d'environnement** dans Vercel :
   Project → Settings → Environment Variables
   
   Ajoute toutes les variables du `.env.example` avec tes vraies valeurs :

   | Variable | Valeur |
   |----------|--------|
   | `NEXT_PUBLIC_SUPABASE_URL` | https://xxx.supabase.co |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | eyJ... |
   | `SUPABASE_SERVICE_ROLE_KEY` | eyJ... |
   | `STRIPE_SECRET_KEY` | sk_live_... |
   | `STRIPE_WEBHOOK_SECRET` | whsec_... |
   | `STRIPE_PRICE_STARTER` | price_... |
   | `STRIPE_PRICE_PRO` | price_... |
   | `STRIPE_PRICE_AGENCE` | price_... |
   | `RESEND_API_KEY` | re_... |
   | `RESEND_FROM_EMAIL` | PostFlow AI <bonjour@ton-domaine.com> |
   | `ADMIN_EMAIL` | toi@gmail.com |
   | `NEXT_PUBLIC_APP_URL` | https://ton-domaine.com |
   | `ADMIN_SECRET_PASSWORD` | [mot de passe long et aléatoire] |

4. Clique **Deploy** — Vercel build et déploie automatiquement

### Connecter ton domaine
1. Vercel → Project → Settings → Domains
2. Add Domain → entre ton domaine (ex: postflow.ai)
3. Ajoute les DNS records indiqués dans ton registrar :
   - Type A : `76.76.21.21` (ou CNAME vers cname.vercel-dns.com)
4. Attends la propagation DNS (1-10 minutes avec Cloudflare)

---

## 5. CHECKLIST FINALE avant de lancer

- [ ] Variables d'environnement ajoutées dans Vercel
- [ ] SQL schema exécuté dans Supabase
- [ ] Webhook Stripe configuré avec la bonne URL de prod
- [ ] Domaine Resend vérifié et DNS propagé
- [ ] Test complet du flux : inscription → paiement → email → validation admin → dashboard
- [ ] Changer `ADMIN_SECRET_PASSWORD` par un mot de passe fort unique

---

## 6. DÉVELOPPEMENT LOCAL

```bash
# Cloner et installer
cd postflow-ai
npm install

# Copier les variables d'environnement
cp .env.example .env.local
# Remplir .env.local avec tes vraies clés (test keys Stripe)

# Lancer le serveur
npm run dev

# Dans un autre terminal, forward les webhooks Stripe (optionnel)
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Ouvre http://localhost:3000

---

## Structure des URLs importantes

| URL | Description |
|-----|-------------|
| `/` | Landing page |
| `/inscription` | Créer un compte |
| `/connexion` | Se connecter |
| `/attente` | Page "compte en validation" |
| `/dashboard` | Dashboard utilisateur (protégé) |
| `/admin` | Page admin (protégée par cookie) |
| `/admin/login` | Login admin |
| `/api/stripe/webhook` | Webhook Stripe (ne pas appeler directement) |
| `/api/admin/valider/[token]` | Activer un compte (lien dans email admin) |
