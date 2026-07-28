# User Testing Results

## 1. Testing Summary

- **Testing date:** 2026-07-28
- **Testing method:** Simulated role-based usability walkthrough
- **Number of tester profiles:** 5
- **Tester profiles:** Three student profiles, one landlord-role profile, and one administrator-role profile
- **Prototype link:** https://student-apartment-finder.onrender.com
- **Testing platform:** Deployed web prototype
- **Detailed results:** `data/user-testing-results.csv`

These results were produced through simulated role-based testing permitted by the Lab 13 activity. They are not presented as interviews with real external participants.

## 2. Task Completion Summary

| Task ID | Task | Result | Main Issue Found | Evidence / Comment |
| --- | --- | --- | --- | --- |
| T01 | Understand the homepage purpose | 3 Yes | No major issue | All student profiles understood the platform’s purpose. |
| T02 | Search and filter apartment listings | 2 Yes, 1 Partial | Some filter labels and the reset action were not immediately clear. | Search and filtering worked, but minor label improvements were identified. |
| T03 | View apartment details and location | 3 Yes | Map delay and landlord contact visibility | All student profiles found the important apartment information. |
| T04 | Start submitting an apartment listing | 1 Partial | Location confirmation and photograph instructions needed clarification. | The form contained the expected fields but required clearer guidance. |
| T05 | Review apartment and roommate records | 1 Yes | Approval controls could be more visible. | The administrator profile understood the records and statuses. |
| T06 | Understand dashboard metrics | 1 Yes | Average-rent currency explanation could be clearer. | The dashboard values and charts were understandable. |
| T07 | Find and understand the roommate feature | 2 Yes, 1 Partial | Moderation status was not immediately clear. | The feature was useful but needed a clearer status explanation. |

## 3. Common Usability Issues

| Issue ID | Issue Description | Severity | Related Requirement | Proposed Fix |
| --- | --- | --- | --- | --- |
| UI-01 | Some filter labels, distance units, and the reset action were not immediately clear. | Important | FR-06 | Clarify the distance unit and make the reset action more noticeable. |
| UI-02 | The Google map may require a short loading time. | Useful | FR-07 | Add a loading indicator or brief location-loading message. |
| UI-03 | The landlord contact or inquiry action could be more visually prominent. | Important | FR-07 | Increase the visibility of the inquiry button or contact section. |
| UI-04 | The landlord form needs clearer location-confirmation and photograph-upload guidance. | Important | FR-03, FR-10 | Add short instructions near the location and photograph fields. |
| UI-05 | Administrator approval controls were not immediately obvious. | Important | FR-08, FR-09 | Improve the visibility and labeling of approval and rejection actions. |
| UI-06 | The average-rent dashboard value could explain its currency more clearly. | Useful | FR-11 | Display `THB/month` beside or directly below the average-rent value. |
| UI-07 | Roommate-post moderation and approval status could be clearer. | Important | FR-08, FR-09 | Add a visible status label and short moderation explanation. |

## 4. User Feedback Summary

The simulated testing contained 15 task attempts. Twelve attempts were completed successfully, three were partially completed, and no task was recorded as a complete failure. The average simulated feedback score was approximately **4.1 out of 5**.

### What Worked Well

- The homepage communicated the platform’s apartment-finding purpose clearly.
- Students could browse and compare approved apartment listings.
- Search and filtering functions helped narrow the available options.
- Apartment detail pages provided useful price, facility, photograph, availability, contact, and location information.
- The roommate feature was considered useful for students interested in shared housing.
- Administrator records, listing statuses, dashboard values, and charts were understandable.

### What Needed Improvement

- Some filter labels and reset controls could be clearer.
- The landlord contact action could be more prominent.
- The landlord form needs clearer location and photograph instructions.
- Administrator approval controls should be easier to notice.
- Roommate-post moderation status should be explained more clearly.
- The average-rent metric should display its currency and time
