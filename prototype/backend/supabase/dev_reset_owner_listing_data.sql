-- Dev-only reset for owner listing database content.
-- Keeps app_users/auth profiles so student, owner, and admin login testing still works.
-- Run this manually in the Supabase SQL Editor before testing fresh owner uploads.
-- Supabase blocks direct SQL deletes from storage.objects, so empty
-- listing-photos/owners/ from the Storage UI if uploaded files should be removed too.

begin;

delete from admin_action_logs
where listing_id in (
  select apartment_listings.id
  from apartment_listings
  join app_users on app_users.id = apartment_listings.owner_id
  where app_users.role = 'owner'
);

delete from saved_listings
where listing_id in (
  select apartment_listings.id
  from apartment_listings
  join app_users on app_users.id = apartment_listings.owner_id
  where app_users.role = 'owner'
);

delete from listing_photos
where listing_id in (
  select apartment_listings.id
  from apartment_listings
  join app_users on app_users.id = apartment_listings.owner_id
  where app_users.role = 'owner'
);

delete from apartment_listings
where owner_id in (
  select id
  from app_users
  where role = 'owner'
);

commit;
