# Data Handling Policy

## Project

Student Apartment Finder Platform

## Data Collection

The prototype collects the minimum data needed for accounts, approved apartment listings, saved listings, roommate requests, private inquiries, notifications, moderation, and usability testing. The authoritative field list and visibility classification are in `data/data-inventory.csv`.

The project must not collect student IDs, government IDs, passwords, OTP codes, banking details, identity-document images, or sensitive roommate traits for the MVP.

## Data Storage

- Supabase Auth handles account authentication.
- Supabase database tables store application records such as accounts, listings, saved items, roommate posts, messages, notifications, and admin actions.
- Supabase Storage stores listing photos.
- GitHub stores only project documentation, source code, sample/masked datasets, and anonymized validation evidence.

## Data Access

- Anonymous visitors: approved public apartment information only; no landlord contact.
- Authenticated students: approved listings, authorized landlord contact, their saved listings, their roommate activity, and their own conversations.
- Owners: their own listings, status, photos, and authorized student inquiries.
- Admin: moderation functions and records needed to approve, reject, or manage content.
- Project team: anonymized testing and validation results for class analysis.

## Data Minimization

- Use a display name instead of requiring a full legal name.
- Keep phone and LINE ID optional.
- Use property location rather than the owner's private address.
- Use general roommate area preferences rather than exact home/live locations.
- Use participant codes rather than tester names or student IDs.
- Redact personal details from open feedback, screenshots, and public GitHub evidence.

## Data Quality

Owners are responsible for accurate apartment details. Admin review reduces misleading, duplicated, outdated, or unsafe submissions. Availability and price must be updated when they change. The platform must not claim that an approved listing has been physically inspected unless a real verification process exists.

## Retention and Deletion

For the class project, identifiable testing notes should be deleted or anonymized after analysis and grading evidence are complete. Before real-world use, the team must implement clear procedures for account deletion, listing/photo removal, message retention, moderation-log retention, and user requests to access or correct their information.

## Responsible Data Rule

Use sample or masked data whenever possible. Never commit credentials, access tokens, real interview identities, private messages, confidential addresses, or sensitive personal information to GitHub.


