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
| Lab 05   | Defined the product concept, mapped features to requirements, created UI/UX wireframes, updated user flow, prepared clickable prototype draft, and updated GitHub documentation for the Student Apartment Finder Platform. | `product-concept.md`, `feature-requirement-mapping.md`, `wireframe-specification.md`, `wireframe-usability-checklist.md`, `homepage.png`, `input-form.png`, `record-list.png`, `detail-view.png`, `dashboard.png`, `admin-view.png` | ✅  Completed |
| **Lab 06** | Completed the Business Model Canvas, mapped MVP features to user and business value, designed the technical architecture, defined the data structure, created the system architecture and data flow diagrams, and updated the project documentation for the Student Apartment Finder Platform. | `business-model-canvas.md`, `feature-value-mapping.md`, `technical-architecture.md`, `data-structure.md`, `system-architecture.png`, `data-flow.png`, updated `README.md`, updated `weekly-logbook.md` | ✅ Completed |
| **Lab 07** | Designed the MVP experiment by identifying critical assumptions, selecting the experiment type, defining success metrics, preparing the experiment script and feedback form, and updating the GitHub documentation for the Student Apartment Finder Platform. | `mvp-experiment-plan.md`, `critical-assumptions.md`, `experiment-script.md`, `success-metrics.md`, `feedback-form.md`, updated `README.md`, updated `weekly-logbook.md` | ✅ Completed |
| **Lab 08** | Conducted customer validation using the MVP prototype, collected and analysed validation data, calculated key analytics metrics, identified usability issues, documented validation insights, made an evidence-based MVP decision, and updated the project documentation. | `validation-results.xlsx`, `validation-results.csv`, `customer-validation-summary.md`, `analytics-insights.md`, `mvp-decision.md`, updated `README.md`, updated `weekly-logbook.md` | ✅ Completed |

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

## Lab 05: Product Concept and UI/UX Wireframe

### Product Concept

The Student Apartment Finder Platform is a web app for students searching for off-campus rooms near Rangsit University, especially new and international students who are not familiar with nearby accommodation options.

The product solves the problem of scattered, unclear, and outdated apartment information. Based on Lab 03 evidence, students often search through many sources such as Facebook groups, friends, seniors, agents, and walking around the area. This makes apartment searching slow, stressful, and difficult to compare.

The proposed web app allows students to browse apartment listings, search and filter by budget, distance, room type, and availability, view apartment details, contact owners directly, and use basic roommate support. Apartment owners can submit and update listings, while admin users can manage listings and view a simple analytics dashboard.

### Requirement-Driven Screens

| Screen | Related Requirement IDs | Wireframe File |
|---|---|---|
| Homepage / Landing | FR-01, FR-02 | `/wireframes/homepage.png` |
| Input / Submission Form | FR-03, FR-10, FR-11 | `/wireframes/input-form.png` |
| Records / Information List | FR-05, FR-06 | `/wireframes/record-list.png` |
| Record Detail View | FR-07, FR-08 | `/wireframes/detail-view.png` |
| Dashboard / Summary | FR-12 | `/wireframes/dashboard.png` |
| Admin / Manager View | FR-09, FR-08 | `/wireframes/admin-view.png` |

### User Flow

The user flow shows how students move through the apartment search process. The main flow begins when a student opens the web app, views the homepage, browses apartment listings, searches or filters apartments, opens an apartment detail page, and then shortlists the apartment or contacts the owner.

The user flow diagram is available here:

- `/diagrams/user-flow.png`
- `/diagrams/user-flow.mmd`

### Team Contribution

All members contributed to the same GitHub repository. The team worked together to convert the Lab 04 requirements, user stories, MVP feature list, and diagrams into Lab 05 product concept and UI/UX wireframe outputs.

The Lab 05 work includes product concept writing, feature-to-requirement mapping, wireframe specification, usability checking, exported wireframe screens, user flow update, clickable prototype draft, README update, and weekly logbook update.

# Lab 06 Update - Business Model Canvas and Technical Architecture

## Lab 06 Summary

In Lab 06, our group transformed the validated problem, system requirements, user stories, and wireframes into a complete business and technical implementation plan for the Student Apartment Finder Platform.

We completed the Business Model Canvas to explain how the platform creates value for students and apartment owners. We also designed the technical architecture, data structure, feature-value mapping, and system diagrams that will guide the implementation of the final MVP prototype.

## Files Added or Updated

- [Business Model Canvas](docs/business-model-canvas.md)
- [Feature-Value Mapping](docs/feature-value-mapping.md)
- [Technical Architecture](docs/technical-architecture.md)
- [Data Structure](docs/data-structure.md)
- [System Architecture Diagram](diagrams/system-architecture.png)
- [Data Flow Diagram](diagrams/data-flow.png)
- [Weekly Logbook](docs/weekly-logbook.md)

## Technical Direction

Our team selected a **database-backed web application** architecture.

Technology stack:

- Frontend: React + Vite + TypeScript
- UI: Tailwind CSS + shadcn/ui
- Backend: Express.js
- Database: Supabase PostgreSQL
- Authentication: Supabase Auth (or simulated authentication during prototype)
- Future deployment: Vercel (Frontend) and Render/Railway (Backend)

This architecture supports three user roles:

- Students
- Apartment Owners
- Admin

The database architecture allows apartment listings, roommate posts, user accounts, listing approvals, and dashboard information to be stored and managed efficiently.

## Final Prototype Connection

The Lab 06 outputs provide the implementation blueprint for the final prototype.

The Business Model Canvas defines how the platform creates value.

The Feature-Value Mapping ensures every MVP feature satisfies the functional requirements and user stories.

The Technical Architecture specifies how the frontend, backend, and database interact.

The Data Structure defines the entities and fields required for implementation.

Together, these documents prepare the project for actual system development during the remaining labs.

## Lab 07: MVP Experiment Design

### Experiment Objective

Our team aims to validate whether students can successfully use the Student Apartment Finder Platform to search for suitable apartments, view detailed information and locations, and reach the apartment owner contact step without assistance. The experiment is designed to evaluate the usability of the core user workflow before continuing with full system implementation.

### Critical Assumptions

- Students prefer a dedicated apartment search platform over scattered Facebook groups and social media.
- Direct communication with apartment owners provides greater value than using intermediaries or agents.
- Students can easily search, filter, and navigate apartment listings without requiring guidance.

### MVP Experiment Type

**Simple Web Prototype**

Our team selected a working web prototype because the application has already been developed using React, TypeScript, Express, and Supabase. This allows real users to interact with the system while we evaluate usability, feature effectiveness, and the overall user experience before further implementation.

### Success Metrics

- At least **70%** of users successfully complete the apartment search task.
- At least **70%** of users correctly use search and filtering features.
- At least **70%** of users reach the apartment owner contact page.
- Users find a suitable apartment within **3 minutes**.
- Average usability rating of **4/5** or higher.
- Average map usefulness rating of **4/5** or higher.
- Average feature usefulness rating of **4/5** or higher.

### Files Added in Lab 07

- `/docs/mvp-experiment-plan.md`
- `/docs/critical-assumptions.md`
- `/docs/experiment-script.md`
- `/docs/success-metrics.md`
- `/docs/feedback-form.md`
- `/docs/weekly-logbook.md`

### Connection to Final Prototype

The MVP experiment provides evidence that the Student Apartment Finder Platform is usable and addresses the needs of its target users. Feedback collected during testing will be used to refine the user interface, improve navigation, validate core features, and guide implementation of the final prototype with greater confidence.

## Lab 08: Customer Validation and Analytics Sheet

### Validation Objective

The team validated whether students could successfully use the Student Apartment Finder Platform to complete the core apartment search workflow and evaluated the usability of the prototype through customer testing and analytics.

### Prototype Version Tested

- **Version:** v0.1
- **Link:** Prototype repository
- **Screenshots:** `/screenshots/validation-test-screens.png`

### Analytics Summary

| Metric | Result |
|---|---:|
| Total test users | 25 |
| Task success rate | 92% |
| Average feedback score | 3.92 / 5 |
| Average interest level | 4.40 / 5 |
| Main confusion point | Filter labels and contact button placement |

### MVP Decision

**Continue with minor revisions.**

The validation results demonstrate that users can successfully complete the core apartment search workflow. The team will continue development while improving several usability issues identified during testing, including filter labels, contact button placement, and clearer availability status indicators.

### Files Added

- `/data/validation-results.xlsx`
- `/data/validation-results.csv`
- `/docs/customer-validation-summary.md`
- `/docs/analytics-insights.md`
- `/docs/mvp-decision.md`
- `/screenshots/validation-test-screens.png`
- `/docs/weekly-logbook.md`

## Current Status

The team has created the GitHub repository with the full required folder structure. We prepared the initial project documentation — README, team profile, idea log, problem notes, and weekly logbook — and set the Student Apartment Finder Chatbot as our current front-runner among three candidate ideas for further evaluation.

In Lab 02, we reviewed multiple IT opportunities, conducted NUF scoring, selected the Student Apartment Finder Platform as our semester project, and created GitHub Issues for future development activities.

In Lab 03, our team collected early customer evidence, validated the existence of the problem, updated project assumptions, and documented customer discovery findings.

In Lab 04, the team converted the Lab 03 evidence into product planning documents. The team created the user persona, user stories, system requirements, MVP feature list, user flow diagram, and use case diagram. The final prototype direction is an interactive web app for the Student Apartment Finder Platform.

In Lab 05, the team converted the Lab 04 outputs into a product concept and UI/UX wireframes. The team prepared the product concept, feature-to-requirement mapping, wireframe specification, usability checklist, user flow, required wireframe screens, and clickable prototype draft. These wireframes will guide the final prototype development in the next lab.

In Lab 06, the team transformed the Lab 05 product concept into a business and technical implementation plan. We completed the Business Model Canvas, feature-value mapping, technical architecture, data structure, and system architecture and data flow diagrams. These outputs provide a clear roadmap for developing the Student Apartment Finder Platform and ensure that the final prototype aligns with the project requirements and user needs.

In Lab 07, the team designed and prepared the MVP experiment for the Student Apartment Finder Platform. We identified critical assumptions, selected a simple web prototype as the experiment method, defined measurable success metrics, prepared an experiment script and feedback form, and updated the project documentation. These outputs provide a structured approach for validating the usability and effectiveness of the prototype before the final implementation stage.

In Lab 08, the team validated the Student Apartment Finder Platform by collecting user testing data and analysing customer feedback. We calculated key validation metrics, identified usability improvements, documented analytics insights, and made an evidence-based MVP decision. The validation confirmed that the core workflow is effective while highlighting several areas for refinement before the final implementation.



## Next Step

In Lab 2, the team will conduct opportunity scanning, validate the problem through user feedback, identify target users in more detail, and evaluate the feasibility of the proposed solution before selecting the final direction.

In Lab 03, we will conduct customer discovery interviews and surveys to validate the apartment search problem and collect evidence from potential users.

In Lab 04, our team will identify and prioritize MVP features based on customer needs and begin designing the prototype for the Student Apartment Finder Platform.

In Lab 05, the team will begin developing the interactive web app prototype based on the Lab 04 system requirements, user stories, MVP feature list, and diagrams.

The next development focus will be the homepage, apartment listing page, search and filter function, apartment detail page, owner listing submission form, listing status handling, admin listing management, and basic admin analytics dashboard.

In Lab 06, the team will continue from the Lab 05 wireframes and begin connecting the prototype direction with business and value planning.

The next development focus will be:

- Review the Lab 05 wireframes as the visual baseline for the final prototype
- Continue improving the clickable web app prototype
- Check that each prototype screen connects to `system-requirements.md`
- Check that each feature connects to `user-stories.md` and `mvp-feature-list.md`
- Prepare Lab 06 business and value planning documents
- Keep all work updated in the same GitHub repository

In Lab 07, the team will begin implementing the Student Apartment Finder Platform based on the Lab 06 technical architecture. We will develop the frontend interface, connect it with the backend and database, implement the core MVP features, and conduct initial testing to ensure the system functions according to the defined requirements and user stories.

In Lab 08, the team will conduct user testing using the MVP experiment plan, collect feedback from target users, evaluate the success metrics, analyse the experiment results, and improve the Student Apartment Finder Platform based on the findings before continuing with the final prototype development.

In Lab 09, the team will improve the prototype based on the customer validation results, resolve the identified usability issues, enhance the user interface and functionality, and continue developing the final MVP prototype to fully satisfy the project requirements.
