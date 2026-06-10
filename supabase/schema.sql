-- ═══════════════════════════════════════════════════
-- PostFlow AI — Schéma Supabase
-- Colle ce SQL dans : Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════

-- Extension UUID
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────
-- Table profiles (extension de auth.users)
-- ─────────────────────────────────────────────────────
create table public.profiles (
  id                    uuid references auth.users(id) on delete cascade primary key,
  email                 text not null,
  nom                   text not null,
  type_profil           text not null check (type_profil in ('coach', 'consultant', 'agence')),
  forfait               text check (forfait in ('starter', 'pro', 'agence')),
  statut                text not null default 'non_paye'
                          check (statut in ('non_paye', 'en_attente', 'actif', 'suspendu')),
  stripe_customer_id    text unique,
  stripe_subscription_id text unique,
  validation_token      text unique,
  date_inscription      timestamptz default now(),
  date_activation       timestamptz,
  updated_at            timestamptz default now()
);

-- Index utiles
create index profiles_statut_idx on public.profiles(statut);
create index profiles_validation_token_idx on public.profiles(validation_token);
create index profiles_stripe_customer_id_idx on public.profiles(stripe_customer_id);

-- ─────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- Un user peut lire son propre profil
create policy "users_select_own" on public.profiles
  for select using (auth.uid() = id);

-- Un user peut mettre à jour son propre profil (champs limités)
create policy "users_update_own" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

-- Le service_role (utilisé côté serveur) a accès complet
-- Pas besoin de policy, le service_role bypasse RLS par défaut.

-- ─────────────────────────────────────────────────────
-- Trigger : créer le profil automatiquement après auth.users insert
-- ─────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, nom, type_profil)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'nom', ''),
    coalesce(new.raw_user_meta_data->>'type_profil', 'coach')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────────────
-- Trigger : mettre à jour updated_at automatiquement
-- ─────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
