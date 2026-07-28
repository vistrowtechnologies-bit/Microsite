alter table public.property_import_jobs
  add column extraction_model text,
  add column openai_response_id text;

create table public.property_facts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  import_job_id uuid not null references public.property_import_jobs(id) on delete cascade,
  category text not null check (category in (
    'Project basics',
    'RERA & possession',
    'Configurations',
    'Pricing',
    'Highlights',
    'Amenities',
    'Floor plans',
    'Gallery',
    'Location',
    'Documents'
  )),
  fact_key text not null,
  label text not null,
  value_json jsonb not null,
  confidence numeric(4, 3) not null check (confidence between 0 and 1),
  review_status text not null default 'extracted'
    check (review_status in ('extracted', 'needs_review', 'confirmed', 'rejected')),
  is_conflict boolean not null default false,
  conflicting_values jsonb not null default '[]'::jsonb,
  evidence jsonb not null default '[]'::jsonb,
  extraction_model text not null,
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (import_job_id, fact_key)
);

create index property_facts_property_category_idx
  on public.property_facts(property_id, category);

alter table public.property_facts enable row level security;

create policy "members read organization property facts"
  on public.property_facts for select
  using (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = property_facts.organization_id
        and membership.user_id = auth.uid()
    )
  );

create policy "members review organization property facts"
  on public.property_facts for update
  using (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = property_facts.organization_id
        and membership.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.organization_members membership
      where membership.organization_id = property_facts.organization_id
        and membership.user_id = auth.uid()
    )
    and (reviewed_by is null or reviewed_by = auth.uid())
  );

create or replace function public.finalize_property_extraction(
  p_import_id uuid,
  p_model text,
  p_response_id text,
  p_facts jsonb,
  p_warnings jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_job public.property_import_jobs%rowtype;
  fact jsonb;
  needs_review_count integer := 0;
begin
  select * into target_job
  from public.property_import_jobs
  where id = p_import_id
  for update;

  if target_job.id is null then
    raise exception 'Import job not found';
  end if;

  delete from public.property_facts
  where import_job_id = p_import_id;

  for fact in select * from jsonb_array_elements(p_facts)
  loop
    if coalesce(fact ->> 'value', '') = '' then
      continue;
    end if;

    if (
      coalesce((fact ->> 'is_conflict')::boolean, false)
      or coalesce((fact ->> 'confidence')::numeric, 0) < 0.85
      or jsonb_array_length(coalesce(fact -> 'evidence', '[]'::jsonb)) = 0
    ) then
      needs_review_count := needs_review_count + 1;
    end if;

    insert into public.property_facts (
      organization_id,
      property_id,
      import_job_id,
      category,
      fact_key,
      label,
      value_json,
      confidence,
      review_status,
      is_conflict,
      conflicting_values,
      evidence,
      extraction_model
    )
    values (
      target_job.organization_id,
      target_job.property_id,
      target_job.id,
      fact ->> 'category',
      fact ->> 'key',
      fact ->> 'label',
      to_jsonb(fact ->> 'value'),
      (fact ->> 'confidence')::numeric,
      case
        when coalesce((fact ->> 'is_conflict')::boolean, false)
          or coalesce((fact ->> 'confidence')::numeric, 0) < 0.85
          or jsonb_array_length(coalesce(fact -> 'evidence', '[]'::jsonb)) = 0
        then 'needs_review'
        else 'extracted'
      end,
      coalesce((fact ->> 'is_conflict')::boolean, false),
      coalesce(fact -> 'conflicting_values', '[]'::jsonb),
      coalesce(fact -> 'evidence', '[]'::jsonb),
      p_model
    );
  end loop;

  update public.property_import_jobs
  set status = 'needs_review',
      progress = 100,
      extraction_model = p_model,
      openai_response_id = p_response_id,
      extraction_summary = jsonb_build_object(
        'fact_count', jsonb_array_length(p_facts),
        'needs_review_count', needs_review_count,
        'warnings', p_warnings
      ),
      completed_at = now(),
      updated_at = now(),
      error_message = null
  where id = p_import_id;

  update public.properties
  set title = coalesce(
        (
          select value_json #>> '{}'
          from public.property_facts
          where import_job_id = p_import_id and fact_key = 'project_name'
          limit 1
        ),
        title
      ),
      developer_name = coalesce(
        (
          select value_json #>> '{}'
          from public.property_facts
          where import_job_id = p_import_id and fact_key = 'developer_name'
          limit 1
        ),
        developer_name
      ),
      locality = coalesce(
        (
          select value_json #>> '{}'
          from public.property_facts
          where import_job_id = p_import_id and fact_key = 'locality'
          limit 1
        ),
        locality
      ),
      city = coalesce(
        (
          select value_json #>> '{}'
          from public.property_facts
          where import_job_id = p_import_id and fact_key = 'city'
          limit 1
        ),
        city
      ),
      price_label = coalesce(
        (
          select value_json #>> '{}'
          from public.property_facts
          where import_job_id = p_import_id and fact_key = 'starting_price'
          limit 1
        ),
        price_label
      ),
      configuration_label = coalesce(
        (
          select value_json #>> '{}'
          from public.property_facts
          where import_job_id = p_import_id and fact_key = 'configurations'
          limit 1
        ),
        configuration_label
      ),
      status = 'in_review',
      updated_at = now()
  where id = target_job.property_id;
end;
$$;

revoke all on function public.finalize_property_extraction(
  uuid, text, text, jsonb, jsonb
) from public;

grant execute on function public.finalize_property_extraction(
  uuid, text, text, jsonb, jsonb
) to service_role;
