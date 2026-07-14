alter table roommate_posts
add column if not exists status text not null default 'active'
  check (status in ('active', 'paused', 'matched', 'expired')),
add column if not exists updated_at timestamptz not null default now(),
add column if not exists expires_at timestamptz not null default (now() + interval '90 days');

drop trigger if exists roommate_posts_set_updated_at on roommate_posts;
create trigger roommate_posts_set_updated_at
before update on roommate_posts
for each row
execute function set_updated_at();

create index if not exists roommate_posts_public_status_idx
  on roommate_posts (status, expires_at, created_at desc);

create table if not exists saved_roommate_posts (
  id text primary key default gen_random_uuid()::text,
  student_id text not null references app_users(id) on delete cascade,
  roommate_post_id text not null references roommate_posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (student_id, roommate_post_id)
);

create index if not exists saved_roommate_posts_student_idx
  on saved_roommate_posts (student_id, created_at desc);

notify pgrst, 'reload schema';
