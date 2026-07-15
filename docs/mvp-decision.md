# Lab 08 - MVP Decision

## 1. Decision
Choose one:

- [ ] Continue with the current MVP direction
- [x] Continue with minor revisions
- [ ] Revise major workflow or feature
- [ ] Collect more evidence before implementation
- [ ] Pivot or change the solution direction

## 2. Evidence Supporting the Decision
The validation test with 25 users showed a 92% task success rate (23 of 25 completed their main task), an average interest level of 4.4/5, and an average feedback score of 3.9/5. 19 of 25 users had no confusion at all. This shows the core workflow and the product idea are validated. The lower feedback points came from small interface confusions, not from the concept — so the team will continue in the same direction while fixing specific screens.

## 3. Requirements to Keep
| Requirement ID | Reason |
|---|---|
| FR-02 | Direct owner contact works and is highly valued by users |
| FR-06 | Search and filter let users complete the core task successfully |
| FR-07 | Listing detail and map view help users judge options |
| FR-05 | Save and roommate board add value with no major issues |

## 4. Requirements to Improve
| Requirement ID | Problem Found | Improvement Needed |
|---|---|---|
| FR-06 | Filter labels unclear (2 users) | Rename filters clearly (budget, distance, room type) |
| FR-02 | Contact button hard to find (2 users) | Make the "Contact owner" button more prominent |
| FR-08 | "Limited" availability wording confusing (1 user) | Add a tooltip or clearer status labels |
| FR-07 | Map marker hard to spot (1 user) | Make apartment map markers larger and clearer |

## 5. Prototype Changes Before Next Lab
1. Clarify the filter labels on the Apartments page.
2. Make the "Contact owner" button larger and more visible on the detail page.
3. Improve the availability status wording (Available / Limited / Unavailable) with a short explanation.
4. Increase the size and contrast of the apartment markers on the map.

## 6. GitHub Issues Created
| Issue Title | Assigned Member | Requirement ID |
|---|---|---|
| Clarify apartment filter labels | Kyaw Linn | FR-06 |
| Make contact-owner button more prominent | Kyaw Linn | FR-02 |
| Improve availability status wording | Kyaw Linn | FR-08 |
| Enlarge map markers for listings | Kyaw Linn | FR-07 |
