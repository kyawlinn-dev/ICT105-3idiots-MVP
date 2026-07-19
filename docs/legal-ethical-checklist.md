# Legal and Ethical Checklist

## Project Title

Student Apartment Finder Platform

## Ethical Review

| Check Item | Yes / No / Partial | Evidence / Notes | Mitigation Action | Owner | GitHub Issue / Commit |
|---|---|---|---|---|---|
| Users are informed about the purpose of the prototype. | Yes | The homepage explains the apartment-search purpose, and the testing consent statement explains the class-research purpose. | Keep the project purpose visible and avoid describing the prototype as a guaranteed rental service. | Phyo Wai Aung | `#PHYO_ISSUE` |
| The prototype avoids misleading claims. | Partial | The terms state that the platform does not own, inspect, rent, or guarantee properties. Listing details are user-submitted. | Require current, accurate listings; label approximate distance; require users to verify property, price, fees, landlord, and contract independently. | Phyo Wai Aung | `#PHYO_ISSUE` |
| The prototype does not collect unnecessary sensitive data. | Yes with controls | The data inventory excludes government IDs, student IDs, banking data, identity documents, and sensitive roommate traits. | Keep phone and LINE ID optional; use display names and participant codes; review open text before public upload. | Phyo Wai Aung | `#PHYO_ISSUE` |
| Users can understand what happens after submission. | Yes | Listing submissions receive confirmation and enter pending admin review; owners receive approval/rejection information. | Keep status labels and confirmation messages consistent and explain who reviews submissions. | Kyaw Linn | `#KYAW_ISSUE` |
| Admin or manager actions are clearly separated from user actions. | Yes | Student, owner, and admin portals are separated, and backend role checks protect owner/admin actions. | Maintain server-side authorization and test unauthorized role requests. | Kyaw Linn | `#KYAW_ISSUE` |
| The prototype avoids unfair or harmful treatment of users. | Partial | Neutral apartment filters and lifestyle tags support choice, but open listing, roommate, and message text could contain discriminatory or abusive content. | Publish content rules, add reporting/moderation, and prohibit discrimination, harassment, scams, and unsafe requests. | Phyo Wai Aung / Kyaw Linn | `#PHYO_ISSUE`, `#KYAW_ISSUE` |
| Roommate matching avoids sensitive profiling. | Partial | Current tags may describe lifestyle preferences, but free text could reveal or request sensitive traits. | Limit tags to voluntary neutral preferences; do not collect religion, ethnicity, health, sexuality, government ID, or financial status. | Phyo Wai Aung | `#PHYO_ISSUE` |
| Users understand that listings require independent verification. | Yes with revision | Terms warn users to verify property condition, landlord identity, pricing, deposits, contracts, roommates, and locations. | Repeat the warning near contact/inquiry actions and never display “verified” without a defined verification process. | Phyo Wai Aung | `#PHYO_ISSUE` |
| Public evidence protects interview and tester identities. | Partial | Existing validation evidence uses test results, but all future open comments and screenshots require review. | Use participant codes, remove contact details, crop private screen areas, and upload only anonymized results. | Phyo Wai Aung / Arkar Kyaw Oo | `#PHYO_ISSUE`, `#ARKAR_ISSUE` |
| Uploaded apartment photos respect privacy and permission. | Partial | Listing photos are public after upload/approval and could accidentally show people or private information. | Require the uploader to have permission; allow only property/room images; reject faces, IDs, documents, or unrelated content. | Kyaw Linn / Arkar Kyaw Oo | `#KYAW_ISSUE`, `#ARKAR_ISSUE` |
| External assets, APIs, and code are credited and licensed. | Pending documentation review | The prototype uses open-source libraries, Lucide icons, Supabase, Google Maps, and image assets. | Complete the IP register with source, license/terms, credit requirement, and replacement action for any unknown asset. | Arkar Kyaw Oo | `#ARKAR_ISSUE` |
| Participation in usability testing is voluntary. | Yes | The consent statement allows participants to skip questions or stop without penalty. | Obtain agreement before testing and do not collect unnecessary identity details. | Phyo Wai Aung | `#PHYO_ISSUE` |

## Possible Misuse and Mitigation

| Possible Misuse | Impact | Mitigation |
|---|---|---|
| Fake or outdated apartment listing | Students may waste time or lose trust. | Admin approval, owner status updates, rejection/removal, and clear independent-verification warning. |
| Scam or unsafe payment request | User could lose money or reveal financial information. | Keep payments outside the MVP, warn against transfers based only on platform content, and add reporting/moderation before public launch. |
| Harassing or discriminatory roommate post/message | Harm or exclusion of users. | Neutral tags, content rules, report/block/moderation process, and removal of abusive content. |
| Scraping landlord contact details | Spam or privacy harm. | Restrict contact details to authenticated students and monitor abusive access before real-world launch. |
| Upload of a private or identifying photograph | Public exposure of a person or document. | Photo instructions, admin review, file deletion/replacement, and prohibition of faces and identity documents. |
| Publication of identifiable tester feedback | Loss of participant privacy. | Participant codes, redaction, anonymized summaries, and screenshot review before GitHub upload. |

## Summary Decision

- **Safe to continue:** With revision and tracked mitigation.
- **Required revisions before a public production launch:** content reporting/moderation, clearer data-retention and deletion procedures, request rate limiting, careful review of public map/photo exposure, defined account/data assistance, and complete IP/license records.
- **Class prototype rule:** use sample/masked data and do not claim that the platform guarantees property quality, landlord identity, roommate safety, availability, pricing, or a successful rental outcome.


