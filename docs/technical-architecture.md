# Technical Architecture

## Project Title

Student Apartment Finder Platform

## 1. Selected Prototype Platform

The selected prototype platform is:

* **Database-backed web app using React, Express.js, and Supabase**

The system will use a web application structure with a frontend interface, backend API layer, and cloud database.

| Layer                | Selected Tool / Technology                                                    |
| -------------------- | ----------------------------------------------------------------------------- |
| Frontend             | React + Vite + TypeScript                                                     |
| UI Styling           | Tailwind CSS + shadcn/ui                                                      |
| Backend API          | Express.js                                                                    |
| Database             | Supabase PostgreSQL                                                           |
| Dashboard            | React dashboard with chart components                                         |
| Authentication       | Supabase Auth or simulated role-based access for prototype                    |
| Hosting / Deployment | Future option: Vercel / Netlify for frontend and Render / Railway for backend |

## 2. Architecture Decision

This architecture is suitable because the Student Apartment Finder Platform has three user roles: students, apartment owners, and admin. These users need to interact with shared apartment listing data.

A database-backed web app is more suitable than a frontend-only prototype because the system needs to store and manage apartment listings, room availability status, owner submissions, saved listings, roommate posts, and admin approval status.

React is suitable for building the student-facing website, owner dashboard, and admin dashboard in one web app. Express.js is useful as a backend API layer because it can handle validation, listing submission, admin approval actions, and future business logic. Supabase is suitable because it provides PostgreSQL database storage, authentication support, and easy cloud-based data management.

This architecture also supports future improvement. The current prototype can start with mock data, but the same data structure can later be moved into Supabase tables.

## 3. Main Components

| Component           | Description                                                                                                                                   | Tool / Technology                                 | Related Requirement        |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------- |
| User Interface      | Provides student, owner, and admin screens for using the platform.                                                                            | React + Vite + TypeScript                         | FR-01, FR-02, FR-13, FR-14 |
| Data Input Form     | Allows apartment owners to submit apartment listing details such as name, price, distance, facilities, availability, and contact information. | React form + Express API                          | FR-03, FR-10, FR-11        |
| Data Storage        | Stores apartment listings, users, saved listings, roommate posts, and listing status.                                                         | Supabase PostgreSQL                               | FR-04, FR-05, FR-08        |
| Record List         | Displays apartment listing records for students and admin users.                                                                              | React components + Supabase data                  | FR-05, FR-06               |
| Detail View         | Shows full information about one apartment listing, including price, distance, facilities, status, and owner contact.                         | React route + Supabase record                     | FR-07                      |
| Admin Function      | Allows admin to approve, reject, edit, or remove apartment listings.                                                                          | React admin dashboard + Express API               | FR-08, FR-09               |
| Dashboard / Summary | Shows analytics such as total listings, available rooms, pending listings, student pain points, and roommate demand.                          | React + chart components + Supabase query results | FR-12                      |

## 4. What Will Be Fully Implemented?

The final prototype should fully implement the main user interface and interaction flow.

The following parts will be fully implemented in the prototype:

* Student homepage / landing page
* Apartment listing page
* Apartment search and filter interface
* Apartment detail page
* Student shortlist / saved listing page
* Roommate support page
* Owner add listing form
* Owner listing management page
* Admin listing management page
* Admin analytics dashboard
* Frontend validation for required listing fields
* Confirmation messages after form submission or status update
* Responsive student-facing interface

## 5. What Will Be Simulated?

Some parts may be simulated if full backend/database implementation cannot be completed within the lab period.

The following parts may be simulated:

* User login and role selection for student, apartment owner, and admin
* Supabase authentication
* Real owner account management
* Real student accounts
* Real-time listing updates
* Real contact or messaging between students and owners
* Admin approval workflow if backend connection is not finished
* Dashboard analytics if live database queries are not finished

In the prototype, these functions can be shown using mock data, frontend state, and sample records. This still allows the team to demonstrate the main workflow clearly.

## 6. Final Prototype Risk

The biggest technical risk is connecting the frontend, Express backend, and Supabase database within the project timeline. Full database integration may take extra time because the team needs to design tables, create API routes, handle validation, manage role access, and test data flow.

To reduce this risk, the team will use a phased approach:

1. Build the frontend screens and user flow first.
2. Define the data structure clearly before creating tables.
3. Use mock data first to test the UI and workflow.
4. Connect Supabase only for the most important records first, such as apartment listings.
5. Keep advanced features such as real authentication, payment, contract signing, and real-time chat out of the MVP.
6. Test each feature step by step before adding more complexity.

This approach allows the final prototype to remain achievable while still showing a realistic full-stack architecture.
