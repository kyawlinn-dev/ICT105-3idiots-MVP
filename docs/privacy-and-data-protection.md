# Privacy and Data Protection

## Project

Student Apartment Finder Platform

## Data Collection Summary

The prototype processes account information, apartment listings, roommate posts, saved listings, inquiry messages, notifications, photos, property locations, moderation records, and usability-testing feedback. The complete field-level classification is recorded in `data/data-inventory.csv`.

The platform must collect only the information needed to authenticate users, publish and manage approved apartment listings, support the student search journey, provide roommate requests, allow private inquiries, and evaluate the class prototype.

## Visibility Rules

| Data Group | Allowed Visibility | Privacy Rule |
|---|---|---|
| Approved apartment information | Public | Show property information needed for comparison. Do not publish an owner's private home details. |
| Landlord contact information | Authenticated students, the owner, and authorized admin | Hide from anonymous visitors. Use a property/business contact method where possible. |
| Account email, optional phone, and optional LINE ID | The account owner and authorized administration | Never include these fields in public lists, screenshots, or GitHub datasets. |
| Owner listing-management information | The listing owner and admin | One owner must not view or change another owner's private management data. |
| Admin moderation information and action logs | Admin only | Use only for approval, rejection, misuse review, and traceability. |
| Saved listings | The student who saved them | Do not expose one student's shortlist to another user. |
| Inquiry messages | Conversation participants only | Do not request or share passwords, OTPs, financial details, government IDs, or identity-document images. |
| Roommate posts | Authenticated users after review | Use a display name and general area. Do not publish exact home/live location or sensitive identity traits. |
| Validation and usability feedback | Project team; aggregated/anonymized class reporting | Use participant codes such as T01. Remove names and contact details before GitHub upload. |

## Privacy Rule for the Prototype

Users must be told what information is collected, why it is needed, who can see it, and how it supports the class project. Optional contact fields must remain optional. Public listing and roommate information must pass admin review. Private account and message information must not appear in anonymous pages or repository evidence.

The project must use sample or masked records for demonstrations and screenshots. Real credentials, access tokens, passwords, student IDs, passport details, national IDs, banking information, identity-document images, health data, religion, ethnicity, sexuality, and other unnecessary sensitive information must not be collected for the MVP.

## Data Minimization Decisions

| Current / Possible Field | Decision | Responsible Reason |
|---|---|---|
| Full legal name | Replace with display name or nickname | A legal identity is not required for the core prototype workflow. |
| Phone and LINE ID | Keep optional and restricted | Users may choose a contact method, but anonymous visitors do not need it. |
| Exact owner home address | Remove | The platform needs the advertised property location, not the owner's private home. |
| Exact property coordinates | Keep with caution or use approximate preview | Coordinates help the map feature but must describe only the advertised property. |
| Student ID or government ID | Remove | The MVP does not need formal identity verification. |
| Banking, card, deposit, or payment information | Remove | Payments are outside the MVP and introduce unnecessary high-risk data. |
| Sensitive roommate traits | Remove | Roommate matching should use voluntary, neutral lifestyle preferences only. |
| Real tester name | Replace with participant code | Validation can be analyzed without publishing identity. |
| Open-text feedback containing personal details | Redact before upload | GitHub evidence is public and should contain anonymized feedback only. |

## Consent and User Understanding

- Before prototype testing, participants receive `docs/user-consent-statement.md`.
- Participation is voluntary and a participant may stop without penalty.
- Testers are told not to enter real sensitive or confidential data.
- Feedback is used only for class analysis and prototype improvement.
- Screenshots and public repository evidence must use anonymized or sample content.

## Storage and Access

- Supabase provides authentication, database, and listing-photo storage for the prototype.
- Passwords are handled by the authentication provider and must never be stored in project documents or GitHub.
- The Express backend enforces role-based access for student, owner, and admin actions.
- Public listing photos and map information require special care because a public URL may be copied or shared.
- Validation datasets stored in GitHub must contain participant codes and non-sensitive feedback only.

## Retention and Deletion Rule

For the class prototype, identifiable testing notes should be deleted or anonymized after the relevant analysis and grading evidence are complete. Sample application records may be kept for demonstrations. Before any real-world launch, the team must define account deletion, message retention, photo deletion, moderation-log retention, and user data-request procedures.

## Privacy Decision

**Continue with mitigation.** The prototype may continue using sample and masked data. The team must maintain contact masking, role-based visibility, voluntary testing consent, public-photo review, generalized roommate locations, and anonymized GitHub evidence.

## GitHub Evidence

- Product & Validation issue: `#PHYO_ISSUE`
- Data inventory: `data/data-inventory.csv`
- Commit link: `COMMIT_LINK_AFTER_UPLOAD`
