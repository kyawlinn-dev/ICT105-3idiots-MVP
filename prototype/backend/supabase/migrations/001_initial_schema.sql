create extension if not exists pgcrypto;

create table if not exists app_users (
  id text primary key,
  auth_user_id uuid unique,
  role text not null check (role in ('student', 'owner', 'admin')),
  display_name text not null,
  email text,
  phone text,
  line_id text,
  created_at timestamptz not null default now()
);

create table if not exists apartment_listings (
  id text primary key,
  name text not null,
  property_type text not null check (property_type in ('condo', 'apartment')),
  near_university text not null,
  location text not null,
  address text,
  google_maps_url text,
  google_place_id text,
  latitude numeric(10, 7) not null,
  longitude numeric(10, 7) not null,
  distance_from_campus numeric(4, 1) not null check (distance_from_campus >= 0),
  price integer not null check (price > 0),
  room_type text not null,
  bedrooms integer not null default 1 check (bedrooms >= 0),
  bathrooms integer not null default 1 check (bathrooms >= 0),
  size text not null,
  facilities text[] not null default '{}',
  availability_status text not null check (availability_status in ('available', 'limited', 'unavailable', 'taken')),
  approval_status text not null check (approval_status in ('approved', 'pending', 'rejected')),
  owner_id text references app_users(id) on delete set null,
  owner_name text not null,
  owner_contact text not null,
  rating numeric(2, 1) check (rating >= 0 and rating <= 5),
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists listing_photos (
  id text primary key,
  listing_id text not null references apartment_listings(id) on delete cascade,
  image_url text not null,
  alt_text text not null,
  sort_order integer not null default 0
);

create table if not exists saved_listings (
  id text primary key default gen_random_uuid()::text,
  user_id text not null references app_users(id) on delete cascade,
  listing_id text not null references apartment_listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, listing_id)
);

create table if not exists roommate_posts (
  id text primary key,
  student_id text references app_users(id) on delete set null,
  title text not null,
  poster_name text not null,
  near_university text not null,
  budget_min integer,
  budget_max integer not null check (budget_max > 0),
  move_in_date text not null,
  location_preference text not null,
  lifestyle_tags text[] not null default '{}',
  description text not null,
  created_at timestamptz not null default now()
);

create table if not exists admin_action_logs (
  id text primary key default gen_random_uuid()::text,
  admin_id text references app_users(id) on delete set null,
  listing_id text references apartment_listings(id) on delete cascade,
  action text not null,
  note text,
  created_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists apartment_listings_set_updated_at on apartment_listings;
create trigger apartment_listings_set_updated_at
before update on apartment_listings
for each row
execute function set_updated_at();

create index if not exists apartment_listings_status_idx
  on apartment_listings (approval_status, availability_status);

create index if not exists apartment_listings_filters_idx
  on apartment_listings (near_university, price, distance_from_campus, room_type);

create index if not exists apartment_listings_location_idx
  on apartment_listings (latitude, longitude);

create index if not exists listing_photos_listing_id_idx
  on listing_photos (listing_id, sort_order);

create index if not exists roommate_posts_student_id_idx
  on roommate_posts (student_id);


