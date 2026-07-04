# Lab 04 - MVP Feature List

## MVP Decision Rule

The MVP features are selected based on three main points:

* The feature must help solve the main apartment searching problem found in Lab 03.
* The feature must support the final interactive web app prototype.
* The feature must be realistic for the team to design and demonstrate within the semester.

The MVP should focus on the main student journey:

Student opens web app → browses apartment listings → searches or filters apartments → views apartment details → contacts owner or shortlists apartment.

Apartment owner and admin functions are included as supporting features because the system also needs listing submission, listing management, and a basic analytics dashboard.

---

## MoSCoW Prioritization

| Feature ID | Feature Name                  | Problem Solved                                                                                  | Related User Story | Priority (Must/Should/Could/Won't) | Technical Complexity (1-5) | User Value (1-5) | Evidence Strength (1-5) | Include in Final Prototype?  |
| ---------- | ----------------------------- | ----------------------------------------------------------------------------------------------- | ------------------ | ---------------------------------- | -------------------------- | ---------------- | ----------------------- | ---------------------------- |
| F01        | Homepage / Landing Page       | Users need to understand the platform purpose quickly.                                          | US-01              | Must                               | 2                          | 4                | 4                       | Yes                          |
| F02        | Apartment Listing Page        | Students need one organized place to view apartment options.                                    | US-02              | Must                               | 3                          | 5                | 5                       | Yes                          |
| F03        | Search and Filter Apartments  | Students struggle because listings are scattered and difficult to compare.                      | US-03              | Must                               | 4                          | 5                | 5                       | Yes                          |
| F04        | Apartment Detail View         | Students need clear price, distance, room type, facilities, and contact information.            | US-04              | Must                               | 3                          | 5                | 5                       | Yes                          |
| F05        | Owner Add Listing Form        | Apartment owners need to submit room information to the platform.                               | US-08              | Must                               | 3                          | 4                | 3                       | Yes                          |
| F06        | Listing Status Display        | Students need to know whether a room is available, unavailable, pending, approved, or rejected. | US-04, US-09       | Must                               | 3                          | 5                | 5                       | Yes                          |
| F07        | Admin Listing Management      | Admin needs to manage incorrect, outdated, or invalid apartment listings.                       | US-09              | Must                               | 4                          | 4                | 4                       | Yes                          |
| F08        | Basic Validation and Feedback | The system needs to prevent incomplete submissions and confirm user actions.                    | US-08, US-09       | Must                               | 3                          | 4                | 4                       | Yes                          |
| F09        | Admin Analytics Dashboard     | Admin needs to view summary data about listings and student search problems.                    | US-10              | Must                               | 4                          | 4                | 4                       | Yes                          |
| F10        | Apartment Shortlist / Compare | Students need help comparing apartment options before deciding.                                 | US-06              | Should                             | 4                          | 4                | 4                       | Yes, if time allows          |
| F11        | Basic Roommate Support        | Some students need roommates to reduce rental cost.                                             | US-07              | Should                             | 3                          | 4                | 4                       | Yes, simple version          |
| F12        | Responsive Web Layout         | Students may use the platform on both laptop and mobile screens.                                | US-01, US-02       | Should                             | 3                          | 4                | 3                       | Yes, basic responsive design |
| F13        | Map View                      | Students want to understand location and distance more easily.                                  | US-04              | Should                             | 5                          | 4                | 4                       | Future                       |
| F14        | Real-Time Chat                | Students and owners may want direct communication inside the system.                            | US-05              | Could                              | 5                          | 3                | 3                       | Future                       |
| F15        | Power BI Integration          | Admin may need advanced analytics and visual reporting.                                         | US-10              | Could                              | 5                          | 3                | 3                       | Future                       |
| F16        | Online Payment                | Students may want to reserve or pay for apartments online.                                      | Future             | Won't                              | 5                          | 3                | 2                       | No                           |
| F17        | Rental Contract Signing       | A full rental process may require digital contract support.                                     | Future             | Won't                              | 5                          | 3                | 2                       | No                           |
| F18        | Full Identity Verification    | Real users may need stronger account verification.                                              | Future             | Won't                              | 5                          | 3                | 2                       | No                           |
| F19        | Full Booking System           | A complete booking workflow is larger than the first MVP scope.                                 | Future             | Won't                              | 5                          | 3                | 2                       | No                           |

---

## Must-Have Features

The must-have features are the core features required for the final web app prototype.

| Feature ID | Feature Name                  | Reason                                                                                                                 |
| ---------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| F01        | Homepage / Landing Page       | Shows the project title, target users, apartment searching problem, and main action.                                   |
| F02        | Apartment Listing Page        | Gives students one organized place to view apartment options.                                                          |
| F03        | Search and Filter Apartments  | Helps students find apartments by price, distance, room type, facilities, and availability.                            |
| F04        | Apartment Detail View         | Shows clear apartment information before students contact the owner.                                                   |
| F05        | Owner Add Listing Form        | Allows apartment owners to submit apartment information.                                                               |
| F06        | Listing Status Display        | Shows whether listings are available, unavailable, pending, approved, or rejected.                                     |
| F07        | Admin Listing Management      | Allows admin to approve, reject, edit, or remove listings.                                                             |
| F08        | Basic Validation and Feedback | Prevents incomplete input and gives confirmation after actions.                                                        |
| F09        | Admin Analytics Dashboard     | Shows useful summary data for admin, such as total listings, available rooms, common pain points, and roommate demand. |

---

## Should-Have Features

The should-have features are useful for the final prototype but can be simplified if development time is limited.

| Feature ID | Feature Name                  | Reason                                                               |
| ---------- | ----------------------------- | -------------------------------------------------------------------- |
| F10        | Apartment Shortlist / Compare | Helps students compare apartment options more easily.                |
| F11        | Basic Roommate Support        | Supports students who want to share rental costs with a roommate.    |
| F12        | Responsive Web Layout         | Helps the web app work reasonably on both laptop and mobile screens. |
| F13        | Map View                      | Useful for location and distance, but it can increase technical complexity.      |

---

## Could-Have / Future Features

These features are useful but not necessary for the first MVP prototype.

| Feature ID | Feature Name         | Reason                                                                                                             |
| ---------- | -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| F14        | Real-Time Chat       | Useful for communication, but contact information is enough for the first MVP.                                     |
| F15        | Power BI Integration | Useful for advanced analytics, but a simple web dashboard is enough for the first prototype unless required later. |

---

## Not in MVP

These features are not included in the first MVP because they are too complex or not required to solve the main apartment searching problem first.

| Feature ID | Feature Name               | Reason                                                                                                                             |
| ---------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| F16        | Online Payment             | Requires payment gateway, security, and financial handling.                                                                        |
| F17        | Rental Contract Signing    | Requires legal agreement handling and stronger verification.                                                                       |
| F18        | Full Identity Verification | Requires sensitive personal data and stronger privacy protection.                                                                  |
| F19        | Full Booking System        | Makes the project too large for the first prototype. The MVP should focus on search, listing, contact, and admin management first. |
