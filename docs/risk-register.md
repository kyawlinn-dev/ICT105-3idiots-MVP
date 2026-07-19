# Lab 09 Risk Register

## Project

Student Apartment Finder Platform

| Risk ID | Category | Risk Description | Affected Feature / Requirement | Severity | Likelihood | Mitigation Action | Owner | GitHub Evidence | Status |
|---|---|---|---|---|---|---|---|---|---|
| R-01 | Privacy | Landlord contact information could be exposed to anonymous visitors or collected for spam. | Apartment detail and contact flow / FR-07, FR-15 | High | Medium | Hide contact details from anonymous users; show them only to authenticated students; use a property or business contact method. | Phyo Wai Aung / Kyaw Linn | Data Inventory issue; Privacy and Consent Review issue; Basic Security Review issue | In Progress |
| R-02 | Privacy | Exact coordinates or addresses could reveal a private home rather than only the advertised property. | Map and apartment location / FR-03, FR-07, FR-15 | High | Medium | Use only verified property locations; remove private owner addresses; consider approximate map markers before opening an approved listing. | Phyo Wai Aung / Kyaw Linn | Data Inventory issue; Privacy and Consent Review issue; Basic Security Review issue | Open |
| R-03 | Privacy / Security | Users may share passwords, OTP codes, banking details, government IDs, or confidential information in messages. | Student-landlord and roommate messages / FR-02, FR-15 | High | Medium | Display a safety warning; prohibit sensitive information; restrict messages to participants; add reporting, moderation, and rate limiting before public launch. | Phyo Wai Aung / Kyaw Linn | Legal and Ethical Review issue; Basic Security Review issue | In Progress |
| R-04 | Ethical | A roommate post or message could contain discriminatory, harassing, or harmful requirements. | Roommate board and messages / FR-05, FR-15 | High | Medium | Allow only neutral voluntary lifestyle preferences; publish content rules; provide reporting and admin moderation; remove abusive content. | Phyo Wai Aung / Kyaw Linn | Legal and Ethical Review issue; Basic Security Review issue | Open |
| R-05 | Privacy / IP | Public listing photographs could contain faces, identity documents, license plates, private backgrounds, or copied images. | Listing-photo upload and public gallery / FR-03, FR-07, FR-15 | High | Medium | Require uploader ownership or permission; allow only property/room images; review images before approval; support deletion and replacement. | Phyo Wai Aung / Kyaw Linn | Privacy and Consent Review issue; IP and Third-Party Assets issue; Basic Security Review issue | Open |
| R-06 | IP | The source and usage permission for `landing-student-room.webp` are not documented. | Homepage visual / FR-01, FR-13 | High | High | Identify the creator and license; if proof cannot be found, replace it with a team-created or verified open-license image. | Phyo Wai Aung | IP and Third-Party Assets issue | Open |
| R-07 | IP / Trademark | `public/icons.svg` contains branded symbols with undocumented sources and appears unused. | Frontend public assets / FR-13 | Medium | Medium | Remove the unused file or identify every icon source, license, permission, and applicable brand guideline. | Phyo Wai Aung / Kyaw Linn | IP and Third-Party Assets issue | Open |
| R-08 | Data Quality / Ethical | Fake, outdated, duplicate, misleading, or unavailable apartment listings could harm users and reduce trust. | Listing submission, status, and admin moderation / FR-03, FR-08, FR-09 | High | Medium | Require admin approval; allow owner status updates; remove invalid listings; avoid claiming physical verification without a defined process. | Phyo Wai Aung / Kyaw Linn | Legal and Ethical Review issue; Basic Security Review issue | In Progress |
| R-09 | Privacy | Test results, screenshots, or feedback uploaded to the public repository could reveal participant identities. | Validation evidence and GitHub documentation / FR-15, FR-16 | High | Low | Use participant codes; redact names and contact details; review screenshots; publish aggregated or anonymized results only. | Phyo Wai Aung / Arkar Kyaw Oo | Data Inventory issue; Privacy and Consent Review issue; README and Weekly Logbook issue | In Progress |
| R-10 | Security | Authentication, messaging, search, and upload endpoints have no documented application-level rate limit. | Accounts, messages, search, and uploads / FR-10, FR-15 | High | Medium | Add rate limiting before public production use, with stricter limits for sign-in, messaging, and uploads. | Kyaw Linn | Basic Security Review issue; Responsible Requirement Updates issue | Open |
| R-11 | Security | Internal database or service-provider error details could be returned to users. | Backend API error handling / FR-10, FR-15 | Medium | Medium | Return generic client error messages and keep detailed technical information in protected server logs. | Kyaw Linn | Basic Security Review issue; Responsible Requirement Updates issue | Open |
| R-12 | Legal / Service Terms | Google Maps and Supabase use is governed by external terms, privacy policies, attribution, and API-key requirements. | Maps, authentication, database, and storage / FR-04, FR-07, FR-15 | Medium | Low | Preserve required attribution; restrict keys; link relevant privacy information; review service terms before public launch. | Phyo Wai Aung / Kyaw Linn | IP and Third-Party Assets issue; Basic Security Review issue | In Progress |

## Risk Summary

- Total risks recorded: 12
- High-severity risks: 8
- Medium-severity risks: 4
- Closed risks: 0
- Decision: Continue the class prototype with tracked mitigation and sample/masked data.

## Priority Actions Before Further Public Use

1. Confirm or replace the undocumented landing image.
2. Remove or document the unused branded SVG icon file.
3. Keep landlord contact restricted to authenticated students.
4. Review exact location and public-photo exposure.
5. Add reporting, moderation, and rate limiting before a public launch.
6. Anonymize all testing evidence before GitHub upload.
7. Update requirements when the team approves the Lab 09 privacy and security clarifications.

## Overall Risk Decision

**Continue with mitigation.** The Student Apartment Finder may continue as an ICT105 class prototype because core role separation, admin review, validation, and contact masking already reduce several risks. It must use sample or anonymized data and must not be described as production-ready. High-risk items remain open until the responsible member adds implementation or review evidence.
