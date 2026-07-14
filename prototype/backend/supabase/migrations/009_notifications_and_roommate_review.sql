alter table roommate_posts add column if not exists approval_status text;

update roommate_posts set approval_status = 'approved' where approval_status is null;

alter table roommate_posts alter column approval_status set default 'pending';
alter table roommate_posts alter column approval_status set not null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'roommate_posts_approval_status_check') then
    alter table roommate_posts add constraint roommate_posts_approval_status_check
      check (approval_status in ('pending', 'approved', 'rejected'));
  end if;
end $$;

create index if not exists roommate_posts_approval_idx
  on roommate_posts (approval_status, status, created_at desc);

create table if not exists app_notifications (
  id text primary key default gen_random_uuid()::text,
  recipient_id text not null references app_users(id) on delete cascade,
  type text not null check (type in ('listing_approved', 'listing_rejected', 'roommate_approved', 'roommate_rejected')),
  title text not null,
  message text not null,
  link text,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists app_notifications_recipient_idx
  on app_notifications (recipient_id, read_at, created_at desc);

notify pgrst, 'reload schema';
