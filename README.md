# Student Apartment Finder Platform

ICT105 IT Startup MVP Project — Team 3idiots

## Course Information

- **Course Code:** ICT105
- **Course Name:** Fundamental Technology Entrepreneurship
- **Instructor:** Dr. Herison Surbakti
- **Project Type:** 14-Labs Continuous IT Startup MVP Development

## Team Name

**3idiots**

## Team Members and Roles

| Name | Role | Responsibility |
|------|------|----------------|
| Phyo Wai Aung | Product Lead + Validation Lead | Define problem, target users, and project direction; manage validation evidence |
| Kyaw Linn | Technical Lead + UX/UI Lead | Manage repository and prototype development; design interface and user flow |
| Arkar Kyaw Oo | Documentation Lead | Maintain README, weekly logbook, reports, and final submission |

## Initial Problem Area

Students — especially new and international students — struggle to find available apartments near the university. Listings are scattered across Facebook groups, agents, and word of mouth, often with unclear prices, room types, and distances from campus, which makes searching slow and stressful.

University students often struggle to find suitable apartments near campus because rental information is scattered across Facebook groups, rental agents, websites, and personal recommendations. This makes the apartment search process time-consuming and inefficient.

## Target Users
* First-year university students
* International students
* Students looking for off-campus accommodation
* Students planning to move to a new apartment

## Initial IT Venture Direction

Our team's front-runner is a **Student Apartment Finder Platform** where students ask for available apartments by budget, distance to campus, and room type, and instantly receive matching listings with details and contact information. This is one of three ideas in `docs/idea-log.md`; the final direction will be confirmed in Lab 2 after opportunity scanning.

## Selected IT Venture Direction

Our team selected the Student Apartment Finder Platform. The platform aims to help students easily find apartments near campus by providing centralized apartment listings, rental information, location details, and contact information. We selected this idea because it solves a real student problem, has a clear target user group, and can be developed as a feasible semester project.


## Technology Possibility

Possible technologies:

- Chat interface (web or messaging)
- Web application
- Database of apartment listings
- AI / natural-language understanding for queries
- Map and distance-to-campus feature
- Search and filter functionality

## Repository Structure

| Folder | Purpose |
|--------|---------|
| `docs/` | Reports, team profile, idea log, weekly logbook, and problem notes |
| `prototype/` | Source code and prototype files |
| `data/` | Survey responses and validation data |
| `finance/` | Financial assumptions and business model |
| `diagrams/` | User flow and system architecture |
| `screenshots/` | Project progress evidence |
| `pitch/` | Presentation and final pitch materials |

## Weekly Progress Log

| Week/Lab | Activities Completed                                                                                                                                                       | Main Deliverables                                                                                                                  | Status      |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | :-----------: |
| Lab 01   | Identified problem areas, generated initial IT venture ideas, and selected three potential opportunities.                                                                  | `idea-log.md`, initial project ideas, GitHub repository setup                                                                      | ✅  Completed |
| Lab 02   | Reviewed opportunities, conducted NUF scoring, selected the Student Apartment Finder Platform, created GitHub Issues, and updated project documentation.                   | `opportunity-scan.md`, `selected-opportunity.md`, `opportunity-scoring.xlsx`, updated README and weekly logbook                    | ✅  Completed |
| Lab 03   | Defined target respondents, prepared customer discovery questions, collected early customer evidence, compared assumptions with evidence, and documented problem findings. | `customer-questions.md`, `problem-notes.md`, `raw-responses.xlsx`, `assumption-evidence-table.md`, `customer-discovery-summary.md` | ✅  Completed |
| Lab 04   | Created the Lab 04 user persona, user stories, system requirements, MVP feature list, user flow diagram, and use case diagram for the Student Apartment Finder Platform. | `user-persona.md`, `user-stories.md`, `system-requirements.md`, `mvp-feature-list.md`, `user-flow.png`, `use-case.png` | ✅  Completed |

## Customer Problem Discovery Summary
In Lab 03, our team conducted customer discovery activities to validate the apartment-searching problems experienced by university students. We collected early evidence through interviews and surveys involving students who have experience searching for off-campus accommodation.
The findings revealed that students mainly rely on Facebook groups, rental agents, recommendations from friends or seniors, and online communities when searching for apartments. However, the information is often scattered, outdated, and difficult to compare.

## Key Findings
Students spend significant time searching for apartment information.
Rental information from different sources is often incomplete or outdated.
Students find it difficult to compare apartment prices, facilities, and locations.
International and first-year students experience greater difficulty because they have limited local knowledge.

## Updated Problem Statement
University students, especially first-year and international students, struggle to find suitable apartments near campus because rental information is scattered across multiple channels, making it difficult to compare options and make informed decisions.

## Lab 04: User Persona, Requirements, and User Stories

### Primary Target User

The primary target user is new and international university students who need to find off-campus accommodation near the university. Lab 03 evidence showed that students spend too much time searching through scattered sources such as Facebook groups, property agents, seniors, friends, and walking around the area.

The first MVP focuses on helping students find nearby rooms in one searchable platform, while apartment owners and admin users support the system through listing submission, listing management, and dashboard monitoring.

### Persona Summary

- Persona name: Mia - Year 1 International Student
- User type: New international student searching for off-campus housing near the university
- Main goal: Find an affordable room close to campus quickly and with confidence
- Main pain point: Apartment listings are scattered, unclear, and difficult to compare
- Current workaround: Facebook groups, Google Maps, LINE, property agents, seniors, friends, and walking around the area

### Key Requirements

| Req ID | Requirement | Priority | Related Evidence |
|---|---|---|---|
| FR-01 | Clear homepage or landing screen showing the project title, target user, problem, and main action | Must | Students need to understand the platform purpose quickly |
| FR-02 | Primary student pathway from opening the website to browsing, filtering, viewing details, and contacting or shortlisting | Must | Students reported a slow and scattered search process |
| FR-03 | Apartment owner listing submission form | Must | Owners need a way to post rooms directly to students |
| FR-05 | Apartment listing page for viewing records | Must | 116 of 120 students used three or more search sources |
| FR-06 | Search and filter function by price, distance, room type, facilities, and availability | Must | Students reported difficulty comparing price, location, and room details |
| FR-07 | Apartment detail view with price, distance, room type, facilities, photos, status, and owner contact | Must | 27 students reported unclear price or distance |
| FR-08 | Listing status tracking such as available, unavailable, pending approval, approved, or rejected | Must | 25 students reported outdated or already taken listings |
| FR-09 | Admin or manager function for approving, rejecting, editing, or deleting invalid listings | Must | The platform needs listing quality control |
| FR-10 | Basic validation and error prevention for listing forms | Must | Required fields prevent incomplete listing information |
| FR-11 | Confirmation or feedback messages after submissions or updates | Must | Users need to know whether an action has been completed |
| FR-12 | Dashboard, summary, or simple analytics view | Must | Admin needs to monitor listings, available rooms, pain points, and roommate demand |
| FR-13 | Basic user interface consistency | Must | The prototype should look like one complete web app |
| FR-14 | Mobile-friendly or responsive design consideration | Should | Students may search for apartments on different devices |
| FR-15 | Basic privacy and responsible data handling | Must | The prototype should avoid unnecessary sensitive personal data |
| FR-16 | Final prototype traceability | Must | Each major screen must connect to requirements, user stories, and MVP features |

### MVP Feature Scope

| Feature | Priority | Included in Final Prototype? |
|---|---|---|
| Homepage / Landing Page | Must | Yes |
| Apartment Listing Page | Must | Yes |
| Search and Filter Apartments | Must | Yes |
| Apartment Detail View | Must | Yes |
| Owner Add Listing Form | Must | Yes |
| Listing Status Display | Must | Yes |
| Admin Listing Management | Must | Yes |
| Basic Validation and Feedback | Must | Yes |
| Admin Analytics Dashboard | Must | Yes |
| Apartment Shortlist / Compare | Should | Yes, if time allows |
| Basic Roommate Support | Should | Yes, simple version |
| Responsive Web Layout | Should | Yes, basic responsive design |
| Map View | Should | Future / optional |
| Real-Time Chat | Could | Future |
| Power BI Integration | Could | Future |
| Online Payment | Won't | No |
| Rental Contract Signing | Won't | No |
| Full Identity Verification | Won't | No |
| Full Booking System | Won't | No |

### Diagram Links

- User flow diagram: `/diagrams/user-flow.png`
- Use case diagram: `/diagrams/use-case.png`

### GitHub Contribution Evidence

All members contributed to this repository through commits, issues, or pull requests. Lab 04 work was organized through GitHub Issues for user persona, user stories, system requirements, MVP feature list, diagrams, and documentation updates.

## Current Status

The team has created the GitHub repository with the full required folder structure. We prepared the initial project documentation — README, team profile, idea log, problem notes, and weekly logbook — and set the Student Apartment Finder Chatbot as our current front-runner among three candidate ideas for further evaluation.

In Lab 02, we reviewed multiple IT opportunities, conducted NUF scoring, selected the Student Apartment Finder Platform as our semester project, and created GitHub Issues for future development activities.

In Lab 03, our team collected early customer evidence, validated the existence of the problem, updated project assumptions, and documented customer discovery findings.

In Lab 04, the team converted the Lab 03 evidence into product planning documents. The team created the user persona, user stories, system requirements, MVP feature list, user flow diagram, and use case diagram. The final prototype direction is an interactive web app for the Student Apartment Finder Platform.



## Next Step

In Lab 2, the team will conduct opportunity scanning, validate the problem through user feedback, identify target users in more detail, and evaluate the feasibility of the proposed solution before selecting the final direction.

In Lab 03, we will conduct customer discovery interviews and surveys to validate the apartment search problem and collect evidence from potential users.

In Lab 04, our team will identify and prioritize MVP features based on customer needs and begin designing the prototype for the Student Apartment Finder Platform.

In Lab 05, the team will begin developing the interactive web app prototype based on the Lab 04 system requirements, user stories, MVP feature list, and diagrams.

The next development focus will be the homepage, apartment listing page, search and filter function, apartment detail page, owner listing submission form, listing status handling, admin listing management, and basic admin analytics dashboard.
