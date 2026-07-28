alter table public.organizations
  drop constraint if exists organizations_business_type_check;

alter table public.organizations
  add constraint organizations_business_type_check
  check (business_type in (
    'Independent broker',
    'Channel partner',
    'Brokerage or team'
  ));

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  slug text not null unique,
  title text not null default 'Untitled property',
  developer_name text,
  locality text,
  city text,
  address text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  starting_price numeric(14, 2),
  price_label text,
  configuration_label text,
  source_notes text,
  status text not null default 'draft'
    check (status in ('importing', 'draft', 'in_review', 'published', 'archived')),
  created_by uuid not null references auth.users(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.property_import_jobs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  status text not null default 'uploading'
    check (status in ('uploading', 'queued', 'processing', 'needs_review', 'completed', 'failed')),
  progress integer not null default 0 check (progress between 0 and 100),
  source_count integer not null default 0,
  extraction_summary jsonb not null default '{}'::jsonb,
  error_message text,
  created_by uuid not null references auth.users(id),
  queued_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.property_sources (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  import_job_id uuid not null references public.property_import_jobs(id) on delete cascade,
  kind text not null check (kind in ('file', 'pasted_text')),
  storage_path text,
  filename text not null,
  mime_type text not null,
  size_bytes bigint not null default 0,
  text_content text,
  status text not null default 'ready'
    check (status in ('uploading', 'ready', 'processing', 'processed', 'failed')),
  created_at timestamptz not null default now(),
  constraint property_sources_file_shape check (
    (kind = 'file' and storage_path is not null and text_content is null)
    or
    (kind = 'pasted_text' and storage_path is null and text_content is not null)
  )
);

create index properties_organization_updated_idx
  on public.properties(organization_id, updated_at desc);

create index property_import_jobs_property_idx
  on public.property_import_jobs(property_id, created_at desc);

create index property_sources_import_job_idx
  on public.property_sources(import_job_id);

alter table public.properties enable row level security;
alter table public.property_import_jobs enable row level security;
alter table public.property_sources enable row level security;

create policy "members read organization properties"
  on public.properties for select
  using (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = properties.organization_id
        and membership.user_id = auth.uid()
    )
  );

create policy "members create organization properties"
  on public.properties for insert
  with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.organization_members membership
      where membership.organization_id = properties.organization_id
        and membership.user_id = auth.uid()
    )
  );

create policy "members update organization properties"
  on public.properties for update
  using (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = properties.organization_id
        and membership.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = properties.organization_id
        and membership.user_id = auth.uid()
    )
  );

create policy "members delete organization properties"
  on public.properties for delete
  using (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = properties.organization_id
        and membership.user_id = auth.uid()
    )
  );

create policy "public reads published properties"
  on public.properties for select
  to anon, authenticated
  using (status = 'published');

create policy "members read organization import jobs"
  on public.property_import_jobs for select
  using (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = property_import_jobs.organization_id
        and membership.user_id = auth.uid()
    )
  );

create policy "members create organization import jobs"
  on public.property_import_jobs for insert
  with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.organization_members membership
      where membership.organization_id = property_import_jobs.organization_id
        and membership.user_id = auth.uid()
    )
  );

create policy "members update organization import jobs"
  on public.property_import_jobs for update
  using (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = property_import_jobs.organization_id
        and membership.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = property_import_jobs.organization_id
        and membership.user_id = auth.uid()
    )
  );

create policy "members delete organization import jobs"
  on public.property_import_jobs for delete
  using (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = property_import_jobs.organization_id
        and membership.user_id = auth.uid()
    )
  );

create policy "members manage organization property sources"
  on public.property_sources for all
  using (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = property_sources.organization_id
        and membership.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = property_sources.organization_id
        and membership.user_id = auth.uid()
    )
  );

create or replace function public.create_property_import(
  p_organization_id uuid,
  p_source_notes text,
  p_source_count integer
)
returns table (property_id uuid, import_id uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  new_property_id uuid;
  new_import_id uuid;
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  if not exists (
    select 1 from public.organization_members
    where organization_id = p_organization_id
      and user_id = current_user_id
  ) then
    raise exception 'Organization access denied';
  end if;

  if p_source_count < 1 then
    raise exception 'At least one source is required';
  end if;

  insert into public.properties (
    organization_id,
    slug,
    title,
    source_notes,
    status,
    created_by
  )
  values (
    p_organization_id,
    'draft-' || replace(gen_random_uuid()::text, '-', ''),
    'Untitled AI project',
    nullif(trim(p_source_notes), ''),
    'importing',
    current_user_id
  )
  returning id into new_property_id;

  insert into public.property_import_jobs (
    organization_id,
    property_id,
    status,
    source_count,
    created_by
  )
  values (
    p_organization_id,
    new_property_id,
    'uploading',
    p_source_count,
    current_user_id
  )
  returning id into new_import_id;

  return query select new_property_id, new_import_id;
end;
$$;

revoke all on function public.create_property_import(uuid, text, integer) from public;
grant execute on function public.create_property_import(uuid, text, integer) to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'property-source-files',
  'property-source-files',
  false,
  104857600,
  array[
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'application/octet-stream',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "members upload organization property sources"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'property-source-files'
    and exists (
      select 1 from public.organization_members membership
      where membership.user_id = auth.uid()
        and membership.organization_id::text = (storage.foldername(name))[1]
    )
  );

create policy "members read organization property sources"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'property-source-files'
    and exists (
      select 1 from public.organization_members membership
      where membership.user_id = auth.uid()
        and membership.organization_id::text = (storage.foldername(name))[1]
    )
  );

create policy "members remove organization property sources"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'property-source-files'
    and exists (
      select 1 from public.organization_members membership
      where membership.user_id = auth.uid()
        and membership.organization_id::text = (storage.foldername(name))[1]
    )
  );
