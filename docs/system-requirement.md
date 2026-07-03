# System Requirements

## Minimum Final Prototype Functionalities

These requirements define the minimum functionalities that our final prototype of the Student Apartment Finder must demonstrate. They translate the fixed ICT105 requirements (FR-01 to FR-16) into our own case: a web platform that helps students near Rangsit University find rooms directly from apartment owners, search and compare listings by price and distance, view apartment details, contact owners without agents, and find roommates. Each requirement below is grounded in our Lab 03 evidence, where students reported a slow, scattered search (an average of about 2.9 weeks across 3 or more sources), and defines what our prototype must show to solve that problem.

| Req ID    | Minimum Prototype Functionality                        | What Students Must Show in Final Prototype                                                                                                                                                                                                                       |
| --------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FR-01** | **Clear problem-specific homepage or landing screen**  | The prototype must clearly show the project title, target user, apartment searching problem, and main action the user can take, such as browsing apartment listings.                                                                                             |
| **FR-02** | **Primary user pathway**                               | The prototype must show how the student moves through the system from start to finish. Example: open website → browse apartment listings → search/filter apartments → view apartment details → contact owner or shortlist apartment.                             |
| **FR-03** | **User input or data submission feature**              | The system must allow apartment owners to submit apartment listing information such as apartment name, price, distance from campus, room type, facilities, availability, and contact details.                                                                    |
| **FR-04** | **Data storage or record management**                  | Submitted apartment listing data must be stored, displayed, or simulated through a database, spreadsheet, local storage, JSON file, Firebase, Google Sheet, or another suitable tool.                                                                            |
| **FR-05** | **View records / information list**                    | The prototype must allow students to view existing apartment listings. Admins should also be able to view submitted apartment records.                                                                                                                           |
| **FR-06** | **Search, filter, or category function**               | The prototype must include a way to find relevant apartments. Students should be able to search or filter by price, distance from campus, room type, facilities, availability, or apartment category.                                                            |
| **FR-07** | **Detail view for each record**                        | Users must be able to open or view more details about a selected apartment listing, including price, distance, room type, facilities, availability, photos, location information, and owner contact details.                                                     |
| **FR-08** | **Status or progress tracking**                        | The system must show the status of an apartment listing. Example: pending approval, approved, rejected, available, unavailable, or already taken.                                                                                                                |
| **FR-09** | **Admin or manager function**                          | The prototype must include at least one admin/manager-side function. Admin should be able to approve listings, reject invalid listings, edit records, delete outdated listings, or manage submitted apartment data.                                              |
| **FR-10** | **Basic validation and error prevention**              | The system must prevent incomplete or incorrect apartment listing input. Example: required fields for apartment name, price, distance, room type, availability, and contact information.                                                                         |
| **FR-11** | **Confirmation or feedback message**                   | After a user submits or updates data, the prototype must show feedback. Example: “Listing submitted successfully,” “Listing approved,” “Status updated,” or “Please complete required fields.”                                                                   |
| **FR-12** | **Dashboard, summary, or simple analytics view**       | The prototype must include at least one summary screen. For this project, the admin dashboard should show total apartment listings, available rooms, unavailable rooms, common student pain points, roommate demand, or student willingness to use the platform. |
| **FR-13** | **Basic user interface consistency**                   | Screens must use consistent layout, navigation, labels, buttons, and visual structure. The apartment finder prototype should look like one complete web app, not disconnected pages.                                                                             |
| **FR-14** | **Mobile-friendly or responsive design consideration** | The prototype must show that the interface can reasonably work on a laptop or mobile screen because students may search for apartments using different devices.                                                                                                  |
| **FR-15** | **Basic privacy and responsible data handling**        | Students must avoid unnecessary sensitive data. The prototype should only collect information needed for apartment searching, listing management, and owner contact. Sample data should be limited or masked where necessary.                                    |
| **FR-16** | **Final prototype traceability**                       | Every major prototype screen or feature must connect back to the Lab 04 requirements, user stories, and MVP feature list. Students must be able to explain why each feature exists based on Lab 03 evidence.                                                     |

---

## Minimum Technical Requirement

The final prototype of the Student Apartment Finder will not be a static mockup or slideshow. It will be an interactive web application where apartment owners can submit and manage room listings, and students can search and filter apartments by price, distance, and room type, open a detailed view of each listing, contact owners directly, post or browse roommate requests, and view listing status. Listing data will be stored in a connected database or spreadsheet backend so that the main workflow — from browsing to contacting an owner — can be fully demonstrated end to end.


## Available Technologies for Prototype

| Platform Type           | Available Prototype Form                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| Web app                 | HTML/CSS/JavaScript, PHP/MySQL, React, Laravel, or similar                                                    |
| Mobile app prototype    | Figma clickable prototype, Flutter, React Native, MIT App Inventor, or similar                                |
| Dashboard system        | Power BI, Tableau, Google Looker Studio, Excel dashboard, or web dashboard                                    |
| Low-code/no-code system | Google Forms + Sheets, Airtable, Notion, Glide, AppSheet, Bubble, or similar                                  |
| Data-driven prototype   | Spreadsheet/database-backed prototype with forms, views, filters, and dashboard                               |
| UI/UX prototype         | Figma prototype, but it must include realistic user flow, data screens, status screens, and interaction logic |

## Selected Prototype Platform

Our final prototype will be a **web app**.

The web app prototype will allow users to click, submit apartment listing data, view apartment records, search/filter listings, open apartment details, update listing status, and view an admin analytics dashboard.
