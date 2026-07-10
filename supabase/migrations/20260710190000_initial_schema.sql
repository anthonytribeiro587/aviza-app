create extension if not exists "pgcrypto";

create type public.member_role as enum ('owner', 'admin', 'editor', 'viewer');
create type public.reminder_status as enum ('draft', 'active', 'paused', 'archived');
create type public.reminder_kind as enum ('scheduled', 'birthday', 'recurring');
create type public.run_status as enum ('pending', 'processing', 'completed', 'partial', 'failed');
create type public.delivery_status as enum ('queued', 'sent', 'delivered', 'read', 'failed');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  timezone text not null default 'America/Sao_Paulo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  full_name text not null,
  role public.member_role not null default 'viewer',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  whatsapp_group_id text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, name)
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  full_name text not null,
  phone text not null,
  birth_date date,
  active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, phone)
);

create table public.contact_groups (
  contact_id uuid not null references public.contacts(id) on delete cascade,
  group_id uuid not null references public.groups(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (contact_id, group_id)
);

create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  group_id uuid references public.groups(id) on delete set null,
  name text not null,
  kind public.reminder_kind not null default 'scheduled',
  status public.reminder_status not null default 'draft',
  message_template text not null,
  schedule_timezone text not null default 'America/Sao_Paulo',
  schedule_rule jsonb not null default '{}'::jsonb,
  next_run_at timestamptz,
  last_run_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reminder_runs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  reminder_id uuid not null references public.reminders(id) on delete cascade,
  status public.run_status not null default 'pending',
  scheduled_for timestamptz not null,
  started_at timestamptz,
  finished_at timestamptz,
  recipient_count integer not null default 0,
  sent_count integer not null default 0,
  failed_count integer not null default 0,
  error_message text,
  created_at timestamptz not null default now()
);

create table public.message_deliveries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  run_id uuid not null references public.reminder_runs(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  destination text not null,
  status public.delivery_status not null default 'queued',
  provider_message_id text,
  error_code text,
  error_message text,
  sent_at timestamptz,
  delivered_at timestamptz,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.whatsapp_instances (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null unique references public.organizations(id) on delete cascade,
  provider text not null default 'evolution',
  instance_name text,
  status text not null default 'disconnected',
  metadata jsonb not null default '{}'::jsonb,
  connected_at timestamptz,
  updated_at timestamptz not null default now()
);

create index groups_organization_idx on public.groups (organization_id);
create index contacts_organization_idx on public.contacts (organization_id);
create index contacts_birth_date_idx on public.contacts (organization_id, birth_date);
create index reminders_next_run_idx on public.reminders (status, next_run_at) where status = 'active';
create index reminder_runs_reminder_idx on public.reminder_runs (reminder_id, scheduled_for desc);
create index deliveries_run_idx on public.message_deliveries (run_id, status);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger organizations_set_updated_at before update on public.organizations for each row execute procedure public.set_updated_at();
create trigger profiles_set_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger groups_set_updated_at before update on public.groups for each row execute procedure public.set_updated_at();
create trigger contacts_set_updated_at before update on public.contacts for each row execute procedure public.set_updated_at();
create trigger reminders_set_updated_at before update on public.reminders for each row execute procedure public.set_updated_at();
create trigger whatsapp_instances_set_updated_at before update on public.whatsapp_instances for each row execute procedure public.set_updated_at();

create or replace function public.current_organization_id()
returns uuid language sql stable security definer set search_path = public as $$
  select organization_id from public.profiles where id = auth.uid() and active = true limit 1;
$$;

revoke all on function public.current_organization_id() from public;
grant execute on function public.current_organization_id() to authenticated;

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.groups enable row level security;
alter table public.contacts enable row level security;
alter table public.contact_groups enable row level security;
alter table public.reminders enable row level security;
alter table public.reminder_runs enable row level security;
alter table public.message_deliveries enable row level security;
alter table public.whatsapp_instances enable row level security;

create policy "members can view their organization" on public.organizations for select to authenticated using (id = public.current_organization_id());
create policy "members can update their organization" on public.organizations for update to authenticated using (id = public.current_organization_id()) with check (id = public.current_organization_id());
create policy "members can view organization profiles" on public.profiles for select to authenticated using (organization_id = public.current_organization_id());
create policy "members can update own profile" on public.profiles for update to authenticated using (id = auth.uid() and organization_id = public.current_organization_id()) with check (id = auth.uid() and organization_id = public.current_organization_id());
create policy "organization access groups" on public.groups for all to authenticated using (organization_id = public.current_organization_id()) with check (organization_id = public.current_organization_id());
create policy "organization access contacts" on public.contacts for all to authenticated using (organization_id = public.current_organization_id()) with check (organization_id = public.current_organization_id());
create policy "organization access contact groups" on public.contact_groups for all to authenticated using (exists (select 1 from public.contacts c where c.id = contact_id and c.organization_id = public.current_organization_id())) with check (exists (select 1 from public.contacts c where c.id = contact_id and c.organization_id = public.current_organization_id()) and exists (select 1 from public.groups g where g.id = group_id and g.organization_id = public.current_organization_id()));
create policy "organization access reminders" on public.reminders for all to authenticated using (organization_id = public.current_organization_id()) with check (organization_id = public.current_organization_id());
create policy "organization access reminder runs" on public.reminder_runs for select to authenticated using (organization_id = public.current_organization_id());
create policy "organization access deliveries" on public.message_deliveries for select to authenticated using (organization_id = public.current_organization_id());
create policy "organization access whatsapp instance" on public.whatsapp_instances for select to authenticated using (organization_id = public.current_organization_id());

comment on column public.reminders.schedule_rule is 'Exemplos: {"frequency":"weekly","weekday":5,"time":"10:00"} ou {"frequency":"birthday","time":"08:00"}.';
