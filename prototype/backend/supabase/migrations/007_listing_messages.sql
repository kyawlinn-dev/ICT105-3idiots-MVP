create table if not exists listing_messages (
  id text primary key default gen_random_uuid()::text,
  listing_id text not null references apartment_listings(id) on delete cascade,
  student_id text not null references app_users(id) on delete cascade,
  landlord_id text not null references app_users(id) on delete cascade,
  sender_id text not null references app_users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists listing_messages_student_idx
  on listing_messages (student_id, created_at desc);

create index if not exists listing_messages_landlord_idx
  on listing_messages (landlord_id, created_at desc);

create index if not exists listing_messages_thread_idx
  on listing_messages (listing_id, student_id, created_at asc);

notify pgrst, 'reload schema';
