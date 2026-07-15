# Lab 08 - Analytics Insights

## 1. Analytics Question
What did users do, say, and prove when testing the Student Apartment Finder MVP direction?

## 2. Metrics Calculated
| Metric | Formula / Method | Result |
|---|---|---|
| Total test users | Count testers | 25 |
| Completed tasks | Count Task_Completed = Yes | 23 |
| Task success rate | Completed tasks / total testers | 92% |
| Average feedback score | Average of 1-5 scores | 3.9 / 5 |
| Average interest level | Average of 1-5 scores | 4.4 / 5 |
| Users with no confusion | Count Confusion_Point = No confusion | 19 of 25 |
| Confusion points | Count repeated confusion categories | 6 total |

## 3. Findings
1. Most users could complete the core workflow: 23 of 25 finished their main task (92% success), showing the search-to-contact flow works.
2. Interest is high (4.4/5 average), meaning students genuinely want this solution, even where usability needs polish.
3. The main friction is not the concept but small UI details — "Filter labels unclear" (2 users) and "Contact button placement" (2 users) were the most repeated confusion points, followed by availability wording and finding the map marker.

## 4. Interpretation
The MVP direction is validated at the concept and workflow level: users complete tasks and show strong interest. The average feedback score (3.9) is slightly pulled down by a few users who hit interface confusion, not by dissatisfaction with the idea. This means the team should keep the current direction and fix specific screens rather than rethink the product.

## 5. Requirements Affected
| Requirement ID | Evidence | Action Needed |
|---|---|---|
| FR-06 | 2 users found filter labels unclear | Rename/clarify filter labels (budget, distance, room type) |
| FR-02 | 2 users struggled to find the contact button | Make the "Contact owner" button more prominent |
| FR-08 | 1 user unsure what "Limited" availability means | Add a short tooltip or clearer status wording |
| FR-07 | 1 user found the map marker hard to spot | Make apartment map markers larger/clearer |

## 6. Next Prototype Improvement
Clarify filter labels, make the contact-owner button more visible, improve availability status wording, and make map markers easier to see — all before deeper implementation continues.
