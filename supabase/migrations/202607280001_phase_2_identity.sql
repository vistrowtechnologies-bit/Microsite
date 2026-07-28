create extension if not exists pgcrypto;

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  city text,
  business_type text not null default 'Channel partner'
    check (business_type in ('Broker', 'Channel partner', 'Agency')),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.broker_profiles (
  organization_id uuid primary key references public.organizations(id) on delete cascade,
  public_name text not null,
  logo_url text,
  rera_number text,
  whatsapp_number text,
  call_number text,
  default_language text not null default 'English',
  default_share_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index organization_members_user_id_idx
  on public.organization_members(user_id);

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.broker_profiles enable row level security;

create policy "users read own profile"
  on public.profiles for select
  using (user_id = auth.uid());

create policy "users update own profile"
  on public.profiles for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "members read their organizations"
  on public.organizations for select
  using (
    exists (
      select 1
      from public.organization_members membership
      where membership.organization_id = organizations.id
        and membership.user_id = auth.uid()
    )
  );

create policy "members read their memberships"
  on public.organization_members for select
  using (user_id = auth.uid());

create policy "members read broker profile"
  on public.broker_profiles for select
  using (
    exists (
      select 1
      from public.organization_members membership
      where membership.organization_id = broker_profiles.organization_id
        and membership.user_id = auth.uid()
    )
  );

create policy "owners update broker profile"
  on public.broker_profiles for update
  using (
    exists (
      select 1
      from public.organization_members membership
      where membership.organization_id = broker_profiles.organization_id
        and membership.user_id = auth.uid()
        and membership.role in ('owner', 'admin')
    )
  )
  with check (
    exists (
      select 1
      from public.organization_members membership
      where membership.organization_id = broker_profiles.organization_id
        and membership.user_id = auth.uid()
        and membership.role in ('owner', 'admin')
    )
  );

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.phone
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

create or replace function public.complete_broker_onboarding(
  p_organization_name text,
  p_role text,
  p_full_name text,
  p_phone text,
  p_city text,
  p_rera_number text,
  p_default_language text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  new_organization_id uuid;
  base_slug text;
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  if exists (
    select 1 from public.organization_members
    where user_id = current_user_id
  ) then
    raise exception 'User already belongs to an organization';
  end if;

  base_slug := trim(both '-' from regexp_replace(
    lower(p_organization_name),
    '[^a-z0-9]+',
    '-',
    'g'
  ));

  insert into public.organizations (
    name,
    slug,
    city,
    business_type,
    created_by
  )
  values (
    p_organization_name,
    base_slug || '-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 6),
    p_city,
    p_role,
    current_user_id
  )
  returning id into new_organization_id;

  insert into public.organization_members (organization_id, user_id, role)
  values (new_organization_id, current_user_id, 'owner');

  update public.profiles
  set full_name = p_full_name,
      phone = p_phone,
      updated_at = now()
  where user_id = current_user_id;

  insert into public.broker_profiles (
    organization_id,
    public_name,
    rera_number,
    whatsapp_number,
    call_number,
    default_language
  )
  values (
    new_organization_id,
    p_organization_name,
    p_rera_number,
    p_phone,
    p_phone,
    p_default_language
  );

  return new_organization_id;
end;
$$;

revoke all on function public.complete_broker_onboarding(
  text, text, text, text, text, text, text
) from public;

grant execute on function public.complete_broker_onboarding(
  text, text, text, text, text, text, text
) to authenticated;
