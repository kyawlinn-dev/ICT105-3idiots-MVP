# Lab 04 - User Stories and Acceptance Criteria

## User Story Format
As a [user role], I want to [goal/action], so that [benefit/value].

## User Stories

| Story ID | Role | User Story | Related Requirement | Priority | Acceptance Criteria | Demo Evidence |
|---|---|---|---|---|---|---|
| US-01 | Student | As a student, I want a clear homepage showing what the platform does, so that I understand how it helps me find housing. | FR-01 | Must | Given I open the site, when the homepage loads, then I see the title, target user, the problem, and a search action. | Homepage screenshot |
| US-02 | Owner | As an owner, I want to post a room listing with price, location, and photos, so that students can find my room directly. | FR-03 | Must | Given I am logged in as an owner, when I submit the listing form, then the room appears in the listings. | Add-listing demo |
| US-03 | Student | As a student, I want to search and filter listings by budget, distance, and room type, so that I can find suitable rooms fast. | FR-06 | Must | Given listings exist, when I set filters, then only matching listings are shown. | Search/filter demo |
| US-04 | Student | As a student, I want to see each listing's price and distance to campus, so that I can compare options clearly. | FR-07 | Must | Given a listing, when I open it, then price, distance, room type, and photos are shown. | Detail screen |
| US-05 | Student | As a student, I want to contact the owner directly, so that I can arrange a viewing without an agent. | FR-02 | Must | Given a listing, when I click contact, then I see the owner's contact method. | Contact flow demo |
| US-06 | Student | As a student, I want to see whether a listing is still available, so that I don't waste time on taken rooms. | FR-08 | Must | Given a listing, when I view it, then its status (available/taken) is shown. | Status label |
| US-07 | Student | As a student, I want to post or browse roommate requests, so that I can find someone to share the rent. | FR-05 | Must | Given the roommate board, when I post or browse, then requests are listed and viewable. | Roommate board demo |
| US-08 | Admin | As an admin, I want to remove invalid or expired listings, so that the platform stays trustworthy. | FR-09 | Should | Given an invalid listing, when I delete it, then it no longer appears. | Admin action demo |
| US-09 | Student | As a student, I want required fields checked when I submit a form, so that I don't send incomplete information. | FR-10 | Must | Given a form, when a required field is empty, then I see an error and cannot submit. | Validation message |
| US-10 | Student | As a student, I want a confirmation after I post or contact, so that I know the action worked. | FR-11 | Must | Given I submit, when it succeeds, then I see a confirmation message. | Confirmation screenshot |
| US-11 | Student | As a student, I want a simple summary of available rooms, so that I can see the options at a glance. | FR-12 | Should | Given the dashboard, when it loads, then it shows totals like number of available rooms. | Summary screen |
| US-12 | Student | As a student, I want to save favorite listings, so that I can track options during my search. | FR-05 | Could | Given a listing, when I save it, then it appears in my saved list. | Saved-list demo |
| US-13 | Owner | As an owner, I want to edit or mark my listing as taken once the room is rented, so that students stop contacting me about it. | FR-08 | Must | Given one of my listings, when I update its status to "taken," then it shows as unavailable to students. | Edit-listing demo |
| US-14 | Owner | As an owner, I want to register and manage my own profile, so that students can see I am a genuine owner. | FR-03 | Should | Given I sign up as an owner, when I complete my profile, then my name and contact appear on my listings. | Owner profile screen |
| US-15 | Admin | As an admin, I want to view all listings and users in one place, so that I can monitor activity on the platform. | FR-05 | Should | Given I am logged in as admin, when I open the admin view, then all listings and users are shown in a list. | Admin dashboard demo |
| US-16 | Admin | As an admin, I want to see a summary of total listings, available rooms, and roommate posts, so that I can understand platform usage. | FR-12 | Should | Given the admin dashboard, when it loads, then it shows totals for listings, available rooms, and roommate posts. | Admin summary screen |

## Acceptance Criteria Checklist
A good acceptance criterion is: testable; observable in the final prototype; connected to a requirement; connected to user evidence; and not too vague.

## Rejected / Future User Stories
| Story ID | Rejected / Future User Story | Reason for Postponing | Future Condition |
|---|---|---|---|
| US-F1 | As a student, I want to pay rent or a deposit online, so that I can secure a room instantly. | Payment gateways are complex and risky; not needed to validate the core search problem. | After MVP is validated and demand is proven |
| US-F2 | As a student, I want AI to automatically match me with a compatible roommate, so that I don't have to search manually. | Weak evidence; needs far more roommate-side data before it's worth building. | After collecting more roommate preference data |
| US-F3 | As a user, I want a mobile app version, so that I can search on the go. | A web prototype is enough to validate the idea this semester. | After the web MVP works and is validated |
| US-F4 | As a student, I want in-app chat with the owner, so that I can negotiate inside the platform. | Direct contact (phone/LINE) already covers the MVP need; chat adds build cost. | After core listing and contact features are stable |
| US-F5 | As a student, I want a map view showing rooms around campus, so that I can see distance visually. | Useful but not essential; distance can be shown as text first. | After basic search and detail views are done |
| US-F6 | As an owner, I want an analytics dashboard of views and interest, so that I can track my listings. | Owner-side feature with weak evidence (only 3 owners surveyed). | After more owner evidence is gathered |
| US-F7 | As a student, I want verified reviews of owners and rooms, so that I can trust listings more. | Requires a user base and moderation; premature for the first prototype. | After the platform has active users |
| US-F8 | As an admin, I want automated detection of duplicate or fake listings, so that quality stays high. | Requires more data and logic than the MVP needs. | After the platform scales |
