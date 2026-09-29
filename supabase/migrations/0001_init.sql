-- ZenithSpace: esquema inicial de PostgreSQL (Supabase)
-- Contenido del blog + mensajes de contacto, con Row Level Security.

create table if not exists public.posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  kicker      text not null,
  summary     text not null,
  hero_image  text not null,
  body        jsonb not null,            -- bloques de contenido (mismo formato que src/data/types.ts)
  sources     jsonb not null default '[]',
  author      text not null default 'Calle Cucho Josue Salomon',
  published   boolean not null default false,
  published_at timestamptz,
  created_at  timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 2 and 80),
  email      text not null,
  subject    text not null check (char_length(subject) between 3 and 120),
  message    text not null check (char_length(message) between 10 and 2000),
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;
alter table public.contact_messages enable row level security;

-- Lectura pública solo de entradas publicadas
create policy "posts_public_read" on public.posts
  for select using (published = true);

-- Solo el administrador autenticado escribe contenido
create policy "posts_admin_write" on public.posts
  for all to authenticated using (true) with check (true);

-- Cualquiera puede enviar un mensaje; solo el admin los lee
create policy "contact_insert_anyone" on public.contact_messages
  for insert to anon, authenticated with check (true);
create policy "contact_admin_read" on public.contact_messages
  for select to authenticated using (true);

-- Bucket de Storage para imágenes del blog
insert into storage.buckets (id, name, public) values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;
