# Lab 10 - Implementation Plan

## 1. Project Information

- **Group name:** 3idiots
- **Project title:** Student Apartment Finder Platform
- **Repository link:** https://github.com/kyawlinn-dev/ICT105-3idiots-MVP
- **Selected platform/tools:** React, Vite, TypeScript, Tailwind CSS, Express, Supabase, and Google Maps Platform
- **Backend status:** Real backend
- ## 2. Prototype Scope for Sprint 1

The Sprint 1 prototype will demonstrate the main student apartment-search journey together with the supporting owner and admin functions.

| Feature | Requirement ID | User Story ID | Screen / Module | Sprint 1 Status |
|---|---|---|---|---|
| Homepage and main navigation | FR-01 | US-01 | Public homepage | In Progress |
| Student browsing and contact pathway | FR-02 | US-05 | Public navigation and apartment details | In Progress |
| Owner apartment submission form | FR-03 | US-02 | Owner add-listing page | In Progress |
| Apartment data storage | FR-04 | US-02, US-13 | Express API and Supabase database | In Progress |
| Apartment record list | FR-05 | US-03 | Apartment listings page | In Progress |
| Search and apartment filters | FR-06 | US-03 | Listing search and filter panel | In Progress |
| Apartment detail view | FR-07 | US-04 | Apartment detail page | In Progress |
| Availability and approval status | FR-08 | US-06, US-13 | Listing cards, details, owner and admin pages | In Progress |
| Admin listing management | FR-09 | US-08, US-15 | Admin listings page | In Progress |
| Form validation | FR-10 | US-09 | Owner listing form | In Progress |
| Confirmation and feedback messages | FR-11 | US-10 | Forms and status actions | In Progress |
| Dashboard and summary information | FR-12 | US-11, US-16 | Admin and owner dashboards | In Progress |
| Responsible data handling | FR-15 | Not directly assigned | Forms, authentication and private data access | In Progress |

## 3. Implementation Approach

- **Frontend:** React, Vite, TypeScript, Tailwind CSS and React Router will provide the prototype screens, navigation and consistent responsive interface.
- **Data source and storage:** Express API and Supabase Postgres will store and retrieve accounts, apartment listings, saved listings, roommate posts, messages, notifications and moderation records.
- **Authentication:** Supabase Auth will support student, owner and admin accounts. Backend role checks will protect owner and admin functions.
- **Admin and status handling:** The admin portal will allow authorized admins to review, approve, reject or remove listings. Owners will be able to update their own listing availability.
- **Search and filtering:** Students will search and filter approved apartments by location, price, distance, room type, facilities and availability.
- **Validation:** Required fields will be checked in the interface and validated by the Express backend using Zod schemas. Users will receive clear error or confirmation messages.
- **Maps and location:** Google Maps Platform will display approved property locations. Private owner addresses and unnecessary location data will not be published.
- **Responsible data handling:** The prototype will follow the Lab 09 data inventory, privacy review, security review and risk register. Demonstrations and screenshots will use sample or masked information.
- **Screenshot evidence:** Working screens will be captured and uploaded to the `screenshots/` folder using the Lab 10 required filenames.

## 4. Member Responsibilities

| Member | Role | Sprint 1 Responsibility | Evidence of Contribution |
|---|---|---|---|
| Phyo Wai Aung | Product Lead and Validation Lead | Prepare the implementation plan, map implemented features to requirements, test the student/owner/admin workflows and capture screenshot evidence. | GitHub issues, `docs/implementation-plan.md`, `docs/feature-implementation-status.md`, screenshots and commits |
| Kyaw Linn | Technical Lead and UX/UI Lead | Verify and improve the student screens, owner listing form, search/filter, navigation, admin dashboard and listing-status functions. | GitHub issues, files in `prototype/`, working prototype and commits |
| Arkar Kyaw Oo | Documentation Lead | Update the main README and weekly logbook with Sprint 1 progress, evidence, problems and member contributions. | GitHub issue, `README.md`, `docs/weekly-logbook.md` and commits |

All members will contribute to the same GitHub repository. Each contribution will be traceable through assigned issues, changed files and commits.

## 5. Risks and Blockers

| Risk or Blocker | Planned Response | Owner |
|---|---|---|
| Supabase environment variables or tables may not be configured correctly. | Check the example environment files, database migrations and sample data before testing. Never upload real keys to GitHub. | Kyaw Linn |
| Student, owner or admin permissions may not work correctly. | Test each role separately and confirm that protected owner/admin actions require authorization. | Kyaw Linn / Phyo Wai Aung |
| Search, form submission or status updates may fail during demonstration. | Test the complete workflow before capturing evidence and record any unfinished feature honestly as `Needs Fix`. | Phyo Wai Aung / Kyaw Linn |
| Screenshots may expose emails, contact details, messages or API keys. | Use sample accounts and masked data, then review every screenshot before uploading it. | Phyo Wai Aung |
| Google Maps may fail because of missing API configuration. | Keep API keys restricted and provide a safe fallback location link or text if the map cannot load. | Kyaw Linn |
| The undocumented landing-page image remains an IP risk from Lab 09. | Confirm its source and permission or replace it with a team-created or verified open-license image. | Phyo Wai Aung / Kyaw Linn |
| Team evidence may be incomplete. | Ensure every member has an assigned issue, file change and commit in the same repository. | All members |
