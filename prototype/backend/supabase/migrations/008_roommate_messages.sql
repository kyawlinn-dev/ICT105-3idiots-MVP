create table if not exists roommate_messages (
  id text primary key default gen_random_uuid()::text,
  roommate_post_id text not null references roommate_posts(id) on delete cascade,
  initiator_id text not null references app_users(id) on delete cascade,
  post_owner_id text not null references app_users(id) on delete cascade,
  sender_id text not null references app_users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now(),
  read_at timestamptz,
  check (initiator_id <> post_owner_id)
);

create index if not exists roommate_messages_initiator_idx
  on roommate_messages (initiator_id, created_at desc);

create index if not exists roommate_messages_owner_idx
  on roommate_messages (post_owner_id, created_at desc);

create index if not exists roommate_messages_thread_idx
  on roommate_messages (roommate_post_id, initiator_id, created_at asc);

notify pgrst, 'reload schema';
