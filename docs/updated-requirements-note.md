# Updated Requirements Note

## Purpose

This note records whether the Lab 09 responsible design review requires changes or clarifications to `docs/system-requirements.md`. The review covers privacy, ethics, IP, and basic security risks found in the Student Apartment Finder Platform.

## Requirement Update Summary

No requirement has been silently changed in `docs/system-requirements.md`. The current Lab 04 requirements remain the baseline for the final prototype. Lab 09 adds responsible-design clarifications that should guide implementation, testing, screenshots, and final presentation.

If the team approves these clarifications, they can be reflected in future requirement wording or linked as supporting notes.

| Requirement ID | Original Requirement | Proposed Update | Reason for Change | Supporting Evidence | GitHub Issue/Commit | Approved by Team? |
|---|---|---|---|---|---|---|
| FR-07 | Users must be able to open apartment details including owner contact details. | Clarify that landlord contact details should be visible only to authenticated students, the listing owner, and authorized admin users. | Lab 09 privacy review found that public contact exposure could create spam and privacy risk. | `docs/privacy-and-data-protection.md`, `data/data-inventory.csv`, `docs/risk-register.md` R-01 | [#58](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/58), [#57](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/57) | Pending team approval |
| FR-03 / FR-07 | Owners can submit listing information including photos, map location, and contact details. | Clarify that listing photos and map locations must describe the advertised property only and must not expose private homes, faces, IDs, documents, or unrelated private information. | Public photos and exact locations can expose personal or private data if not reviewed. | `docs/privacy-and-data-protection.md`, `docs/ip-and-third-party-assets.md`, `docs/risk-register.md` R-02 and R-05 | [#58](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/58), [#57](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/57) | Pending team approval |
| FR-10 | The system must prevent incomplete or incorrect listing input. | Clarify that validation must happen on the backend as well as in the frontend, especially for listing, roommate, message, upload, and authentication actions. | Browser validation alone is not enough because users can call backend APIs directly. | `docs/security-risk-check.md`, `docs/risk-register.md` R-10 and R-11 | [#58](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/58), [#57](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/57) | Pending team approval |
| FR-09 | Admin should approve, reject, edit, delete, or manage submitted apartment data. | Clarify that admin and owner actions must be protected by backend role checks, not only by hidden frontend navigation. | Lab 09 security review requires controlled admin/manager actions and protection against unauthorized role access. | `docs/security-risk-check.md`, `docs/risk-register.md` R-08 and R-11 | [#58](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/58), [#57](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/57) | Pending team approval |
| FR-11 | The prototype must show feedback after submit or update actions. | Clarify that user-facing error messages should be helpful but should not expose internal database, schema, key, or service-provider details. | Internal technical errors can reveal implementation details and create security risk. | `docs/security-risk-check.md`, `docs/risk-register.md` R-11 | [#58](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/58), [#57](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/57) | Pending team approval |
| FR-15 | The prototype should only collect information needed for apartment searching, listing management, and owner contact. | Clarify that the MVP must not collect student IDs, government IDs, banking/payment data, passwords, OTP codes, identity-document images, exact private home locations, or sensitive roommate traits. | Lab 09 data inventory and privacy review identify these fields as unnecessary or high-risk for the MVP. | `data/data-inventory.csv`, `docs/data-handling-policy.md`, `docs/privacy-and-data-protection.md` | [#58](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/58) | Pending team approval |
| FR-15 / F11 | Basic roommate support is included as a simple version. | Clarify that roommate posts should use general area preferences and voluntary neutral lifestyle tags only, with moderation for discriminatory, harassing, or unsafe text. | Roommate free text can create privacy and ethical risks if users publish sensitive traits or exact live locations. | `docs/legal-ethical-checklist.md`, `docs/privacy-and-data-protection.md`, `docs/risk-register.md` R-03 and R-04 | [#58](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/58) | Pending team approval |
| FR-16 | Every major prototype screen or feature must connect back to requirements, user stories, and MVP features. | Add traceability from responsible-design documents to final prototype decisions, including security review, data inventory, risk register, and requirement update notes. | Lab 09 requires responsible design changes to be traceable through GitHub issues, logbook, and documentation. | `docs/risk-register.md`, `docs/security-risk-check.md`, `docs/privacy-and-data-protection.md` | [#58](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/58) | Pending team approval |

## Implementation Decision

**Continue with mitigation.**

The existing system requirements do not need to be rewritten immediately because the core MVP scope is still valid: apartment search, listing submission, listing status, admin review, saved listings, basic roommate support, and basic inquiry messaging. Lab 09 adds stronger privacy, ethics, IP, and security constraints around how those features should be implemented and demonstrated.

## Actions Before Final Prototype Submission

1. Keep landlord contact hidden from anonymous users.
2. Keep admin and owner actions protected by backend role checks.
3. Use sample or masked data in screenshots and GitHub evidence.
4. Avoid collecting unnecessary sensitive fields.
5. Review public listing photos and map links before demo.
6. Add or document rate limiting before any real public launch.
7. Replace or document any image/icon asset with unclear source or permission.

## Rule

Do not silently change system requirements. Every change must be justified, documented, and traceable through GitHub issues, commits, and the weekly logbook.

## GitHub Evidence

- Related issue: [#58 Document Responsible Requirement Updates](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/58)
- Related security issue: [#57 Complete Basic Security Review](https://github.com/kyawlinn-dev/ICT105-3idiots-MVP/issues/57)
- Related documents: `docs/system-requirements.md`, `docs/mvp-feature-list.md`, `docs/privacy-and-data-protection.md`, `docs/risk-register.md`, `docs/security-risk-check.md`
