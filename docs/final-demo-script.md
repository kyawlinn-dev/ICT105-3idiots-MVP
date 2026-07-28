# Final Demo Script

## Demo Duration

Recommended duration: approximately 5–7 minutes.

## Presenter Roles

| Member | Presentation Responsibility |
| --- | --- |
| Phyo Wai Aung | Opening, problem, target users, value proposition, validation findings, and closing |
| Kyaw Linn | Student, landlord, administrator, data-handling, and dashboard demonstration |
| Arkar Kyaw Oo | Requirement evidence, repository documentation, limitations, and final preparation |

## 1. Opening

“Good morning. Our project is the **Student Apartment Finder Platform**.

University students, especially first-year and international students, often struggle to find suitable accommodation near campus. Apartment information is scattered across Facebook groups, agents, websites, and personal recommendations. Prices, facilities, availability, distances, photographs, and contact information can be incomplete or difficult to compare.

Our platform brings this information together in one place. Students can browse approved listings, search and filter apartments, view detailed information and map locations, and contact landlords. The platform also supports landlord submissions, roommate posts, administrator review, and useful dashboard metrics.”

## 2. User Scenario

“Imagine an international or first-year student preparing to study near Rangsit University. The student needs an affordable apartment close to campus but does not know which information sources are reliable.

Instead of searching through multiple unrelated channels, the student opens the Student Apartment Finder, compares available apartments, checks their prices and locations, and chooses which landlord to contact.”

## 3. Prototype Walkthrough

| Step | Screen / Feature | What to Demonstrate and Say | Requirement ID |
| --- | --- | --- | --- |
| 1 | Homepage | “The homepage identifies the Student Apartment Finder, its target area, and its main purpose. Students can begin searching for apartments or access the roommate feature.” | FR-01 |
| 2 | Apartment List and Filters | “The apartment page shows approved listings. We can search by apartment, area, or university and filter by price, distance, university, room type, facilities, and availability.” | FR-02, FR-05, FR-06 |
| 3 | Apartment Detail View | “Opening a listing shows its photographs, monthly rent, room details, facilities, distance, availability, landlord contact information, description, and confirmed map location.” | FR-07, FR-08 |
| 4 | Landlord Add Listing Form | “The landlord portal provides structured fields for the apartment name, property type, university, room type, size, price, location, facilities, availability, landlord contact, and photographs. The form also provides validation and feedback.” | FR-03, FR-04, FR-10 |
| 5 | Administrator Functions | “The administrator can view apartment listings, check approval status, review roommate posts, and inspect landlord records. Submitted content can be approved or rejected.” | FR-08, FR-09 |
| 6 | Dashboard and Metrics | “The dashboard displays approved listings, pending reviews, available rooms, average rent, listing status, student pain points, roommate demand, and recent listings.” | FR-11 |
| 7 | Requirement Traceability | “Each major screen is connected to a requirement, user story, MVP feature, final screenshot, and testing record in our traceability documents.” | FR-12 |

## 4. Evidence and Validation

“Our early customer-discovery work showed that students experience difficulty because apartment information is scattered, incomplete, and difficult to compare.

For Lab 13, we completed a simulated role-based usability evaluation using student, landlord, and administrator profiles. The test included 15 task attempts: 12 were completed successfully, three were partially completed, and none completely failed.

The testing confirmed that the main apartment-search pathway works. It also identified minor improvements involving filter clarity, landlord-form guidance, inquiry visibility, administrator controls, roommate status, map loading, and dashboard currency labels.

Our Lab 14 final testing records six successful checks and two partial checks. The remaining partial items are documented honestly under FR-03 and FR-10 rather than being presented as fully complete.

The final sample dataset contains six approved apartment records with monthly prices ranging from THB 3,000 to THB 10,500. Private landlord contact details were excluded from the final dataset.”

## 5. Closing

“The Student Apartment Finder is more than a static design. It demonstrates a connected student, landlord, and administrator workflow supported by apartment records, search and filtering, detail pages, status tracking, moderation, maps, photographs, and dashboard metrics.

The prototype addresses the main problem by making
