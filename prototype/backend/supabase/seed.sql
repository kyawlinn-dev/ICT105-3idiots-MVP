insert into app_users (id, role, display_name, email, phone, line_id)
values
  ('student-demo', 'student', 'Mia Demo', 'mia.student@example.com', null, null),
  ('owner-krit', 'owner', 'Krit S.', 'krit.owner@example.com', null, 'krit-demo'),
  ('owner-narin', 'owner', 'Narin P.', 'narin.owner@example.com', null, 'narin-demo'),
  ('owner-somchai', 'owner', 'Somchai R.', 'somchai.owner@example.com', null, 'somchai-demo'),
  ('admin-demo', 'admin', 'Admin Demo', 'admin@example.com', null, null)
on conflict (id) do nothing;

insert into roommate_posts (
  id,
  student_id,
  title,
  poster_name,
  near_university,
  budget_min,
  budget_max,
  move_in_date,
  location_preference,
  lifestyle_tags,
  description
)
values
  (
    'rm-1',
    'student-demo',
    'Looking for roommate near Rangsit University',
    'Mia Demo',
    'Rangsit University',
    4000,
    5500,
    'August 2026',
    'Muang Ake or Lak Hok',
    array['Quiet', 'Clean', 'No smoking'],
    'Looking for a roommate to share an apartment near Rangsit University. Prefer a clean and quiet student.'
  ),
  (
    'rm-2',
    'student-demo',
    'Need roommate for condo near Bangkok University',
    'Mia Demo',
    'Bangkok University',
    6000,
    7500,
    'July 2026',
    'Khlong Nueng or Kave Town area',
    array['Student', 'Study focused', 'Friendly'],
    'Looking for a roommate to share a condo near Bangkok University. Prefer someone who studies regularly and keeps the room clean.'
  )
on conflict (id) do nothing;
