# Basic Security Risk Check

## Project

Student Apartment Finder Platform

## Review Scope

This review checks the prototype against Lab 09 security expectations: form validation, account roles, admin access, public information, status updates, messages, map locations, and photo uploads. The review is based on the current React frontend, Express backend, Supabase database/authentication, and Lab 09 privacy/risk documents.

| Area | Risk Question | Current Status | Risk Level | Mitigation | Owner |
|---|---|---|---|---|---|
| Form input | Can incomplete or invalid data be submitted? | The backend uses validation schemas for listing, roommate, and message inputs. Required fields are checked before records are created or updated. | Medium | Keep server-side validation as the main control; do not rely only on browser `required` fields. Continue checking price, distance, contact, photo URL, message length, and role-specific fields. | Kyaw Linn |
| Account authentication | Can users access private actions without signing in? | The backend uses Supabase Auth sessions stored in HTTP-only cookies. Protected routes require an authenticated account. | Medium | Keep authentication checks on every protected API route. Confirm deployed Supabase keys are correct and never commit real `.env` values. | Kyaw Linn |
| Admin function | Can normal users access admin actions? | Admin routes use role checks before approval/rejection and dashboard actions. Student and owner portals are separated from admin routes. | Medium | Maintain backend role checks for admin-only actions. Test that student and owner accounts receive forbidden responses when calling admin endpoints. | Kyaw Linn |
| Owner data editing | Can one owner edit another owner's listing? | Owner listing routes use the authenticated owner profile when creating or updating owner records. | Medium | Keep owner ID checks in backend services and test cross-owner update attempts. Admin edits should remain separate from owner self-management. | Kyaw Linn |
| Data display | Is private information visible to everyone? | Anonymous visitors can browse approved listing information, but landlord contact is intended for authenticated students. Private saved lists, messages, and notifications are tied to the signed-in user. | High | Keep contact details hidden from anonymous users. Do not expose account email, phone, LINE ID, saved listings, private messages, or notifications outside authorized users. | Kyaw Linn / Phyo Wai Aung |
| Status update | Can records be edited or approved without control? | Listing and roommate-post statuses are controlled through owner/admin workflows. Admin approval is required before public visibility. | Medium | Keep status changes restricted by role. Keep action logs for admin decisions and show clear status feedback to owners/students. | Kyaw Linn |
| Public links | Does a public link expose data that should be private? | Approved apartment pages and public photo URLs may be shared. Google Maps links may reveal exact property locations. | High | Use only advertised property locations, not owner private home addresses. Review public screenshots and links before GitHub upload. Consider approximate map previews before public launch. | Phyo Wai Aung / Kyaw Linn |
| File upload | If used, can unsafe or unrelated files be uploaded? | Listing photo upload accepts image files and stores them in the `listing-photos` bucket. Public image URLs can be copied after upload. | High | Keep MIME/type and size limits. Allow only room/property photos. Reject faces, identity documents, license plates, private backgrounds, copied images, and unrelated content during admin review. | Kyaw Linn / Arkar Kyaw Oo |
| Messages and roommate posts | Can users share unsafe, discriminatory, or sensitive information? | The MVP has basic inbox-style messages and roommate posts, not real-time chat. Free-text input can still contain sensitive or harmful content. | High | Warn users not to share passwords, OTP codes, banking details, government IDs, exact home locations, harassment, scams, or discriminatory text. Add reporting/moderation before real public use. | Phyo Wai Aung / Kyaw Linn |
| Rate limiting | Are sign-in, message, search, or upload endpoints protected from repeated abuse? | No application-level rate limiting is documented for the backend. | High | Add rate limiting before public production use, especially for sign-in, sign-up, messages, search, and uploads. Keep this as an open mitigation in the risk register. | Kyaw Linn |
| Error messages | Could internal database or service errors be shown to users? | The backend has centralized error handling, but service-provider error messages may still be returned in some cases. | Medium | Return user-friendly messages on the client and keep technical error details in protected server logs. Avoid exposing table names, schema details, keys, or provider internals. | Kyaw Linn |
| Secrets and API keys | Could keys or credentials be exposed in GitHub or screenshots? | `.env` files are for local/deployment configuration. GitHub should only contain `.env.example` and documentation placeholders. | High | Never commit real Supabase keys, Google Maps keys, cookies, passwords, or screenshots showing secrets. Use Render/Supabase environment settings for deployment secrets. | Kyaw Linn |

## Security Decision

**Continue with mitigation.**

The prototype can continue as an ICT105 class MVP because core controls already exist: Supabase authentication, HTTP-only cookies, backend role checks, validation schemas, admin approval, and separation of student/owner/admin workflows. However, the project is not production-ready. Rate limiting, stronger reporting/moderation, public-photo review, safer error handling, and stricter privacy review are required before wider public use.

## GitHub Evidence

- Related issue: [#57 Complete Basic Security Review](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/57)
- Related risks: `docs/risk-register.md` R-01, R-02, R-03, R-05, R-08, R-10, R-11, R-12
- Related requirements: `docs/system-requirements.md` FR-09, FR-10, FR-15, FR-16
- Related privacy review: `docs/privacy-and-data-protection.md`
