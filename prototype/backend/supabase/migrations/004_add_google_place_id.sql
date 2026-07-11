alter table apartment_listings
  add column if not exists google_place_id text;

delete from listing_photos
where image_url ilike '%images.unsplash.com%';
