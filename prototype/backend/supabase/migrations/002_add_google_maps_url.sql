alter table apartment_listings
  add column if not exists google_maps_url text;

update apartment_listings
set google_maps_url = case id
  when 'apt-001' then 'https://www.google.com/maps/@13.9874000,100.6195000,17z'
  when 'apt-002' then 'https://www.google.com/maps/@13.9649000,100.6059000,17z'
  when 'apt-003' then 'https://www.google.com/maps/@13.9960000,100.6238000,17z'
  when 'apt-005' then 'https://www.google.com/maps/@13.9575000,100.6029000,17z'
  when 'apt-007' then 'https://www.google.com/maps/@14.0392000,100.6157000,17z'
  else google_maps_url
end
where id in ('apt-001', 'apt-002', 'apt-003', 'apt-005', 'apt-007')
  and google_maps_url is null;
