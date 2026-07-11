alter table roommate_posts
add column if not exists student_id text references app_users(id) on delete set null;

create index if not exists roommate_posts_student_id_idx
  on roommate_posts (student_id);

update roommate_posts
set student_id = 'student-demo'
where student_id is null
  and exists (select 1 from app_users where id = 'student-demo' and role = 'student');
