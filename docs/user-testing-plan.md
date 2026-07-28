# User Testing Plan

## 1. Testing Objective

The objective of this testing is to determine whether target users can understand and use the Student Apartment Finder Platform without major assistance before the final Lab 14 release.

The testing will evaluate whether users can:

- Understand the platform’s purpose from the homepage.
- Browse, search, and filter apartment listings.
- Open and understand an apartment detail page.
- Find price, distance, facilities, availability, landlord, and location information.
- Understand the landlord listing-submission process.
- Understand listing approval and administrator functions.
- Identify confusing screens, labels, fields, or actions.
- Suggest improvements before the final MVP release.

## 2. Test User Profile

| User Type | Planned Number of Testers | Why This User Type Matters |
| --- | ---: | --- |
| University students | 3 | Students are the platform’s main target users and need to search for suitable accommodation near campus. |
| Landlord or landlord-role tester | 1 | This tester can evaluate whether apartment listing submission is clear and practical. |
| Administrator-role tester | 1 | This tester can evaluate listing review, approval status, moderation, and dashboard functions. |

The same person may test both the landlord and administrator roles if access to separate testers is limited. Actual tester roles and numbers will be recorded in the testing results.

## 3. Testing Tasks

| Task ID | User Task | Related Requirement | Success Criteria | Observation Focus |
| --- | --- | --- | --- | --- |
| T01 | Open the homepage and explain what the platform is for. | FR-01 | Tester correctly identifies the platform’s purpose and target users without help. | Clarity of the headline, value message, and main actions. |
| T02 | Open the apartment list and find an apartment within a preferred price or distance. | FR-02, FR-05, FR-06 | Tester uses search or filters and finds a relevant apartment without major help. | Search visibility, filter labels, results, and reset behavior. |
| T03 | Open an apartment and identify its rent, facilities, availability, landlord contact, and map location. | FR-07, FR-08 | Tester finds and understands the required apartment information. | Detail-page layout, labels, status, photographs, and map clarity. |
| T04 | Use the landlord portal to start submitting an apartment listing. | FR-03, FR-04, FR-10 | Tester understands the required fields and receives validation or feedback for missing information. | Form labels, required fields, location input, photograph upload, and validation. |
| T05 | Open the administrator listing area and identify approved or pending listings. | FR-08, FR-09 | Tester understands the listing status and available administrator actions. | Status labels, navigation, approval controls, and role separation. |
| T06 | Open the administrator dashboard and explain at least two displayed metrics. | FR-11 | Tester correctly explains at least two dashboard values or charts. | Metric labels, usefulness, and visual clarity. |
| T07 | Find the roommate feature and understand how roommate posts are reviewed. | FR-02, FR-08, FR-09 | Tester locates the feature and understands the post or moderation status. | Navigation, post information, safety, and moderation clarity. |

## 4. Testing Procedure

1. Open the deployed Student Apartment Finder prototype before the tester begins.
2. Explain that the purpose is to test the prototype, not the tester.
3. Record only a tester ID and general role; do not record unnecessary personal information.
4. Ask the tester to complete each assigned task without step-by-step guidance.
5. Observe where the tester hesitates, becomes confused, selects the wrong action, or requests help.
6. Record each task as **Yes**, **Partial**, or **No** for completion.
7. Record approximate completion time, confusion points, comments, and a feedback score from 1 to 5.
8. Ask the tester what they liked, disliked, misunderstood, and would improve.
9. Save the results in `data/user-testing-results.csv`.
10. Summarize common findings in `docs/user-testing-results.md`.
11. Convert confirmed problems into items in `docs/final-improvement-list.md`.
12. Capture testing evidence without showing private or sensitive information.

## 5. Testing Evidence to Collect

For each test, record:

- Tester ID
- Tester type or role
- Task ID and task description
- Completion result
- Approximate completion time
- Confusion point
- Feedback score from 1 to 5
- Tester comment
- Related requirement
- Recommended improvement

## 6. Ethical Reminder

Participation should be voluntary, and testers should be told that their feedback is being collected for a university prototype evaluation.

The team will not collect passwords, identification numbers, private messages, exact home addresses, or unnecessary personal contact information. Tester names should be replaced with anonymous IDs such as `STU-01`, `LAND-01`, and `ADM-01`.

Screenshots must not expose personal browser profiles, email addresses, access tokens, passwords, or other sensitive information.
