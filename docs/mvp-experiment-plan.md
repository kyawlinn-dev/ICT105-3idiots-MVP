# MVP Experiment Plan

## 1. Group and Project Information
- Group name: 3idiots
- Project title: Student Apartment Finder
- Repository link: https://github.com/kyawlinn-dev/ICT105-3idiots-MVP
- Main target user: Students searching for off-campus rooms near Rangsit University, especially new and international students
- Prototype platform: Web app (React + TypeScript + Vite frontend, Express + Supabase backend)

## 2. Experiment Objective
We want to test whether students can search for a suitable apartment, view its details and location, and reach the owner-contact step without help — using our working web prototype.

## 3. Requirement Scope for the Experiment

| Requirement ID | Requirement Summary | Related Screen/Feature | Tested in This Experiment? |
|---|---|---|---|
| FR-01 | Homepage or landing screen | Home page | Yes |
| FR-02 | Primary user pathway | Home → Apartments → Detail → Contact | Yes |
| FR-06 | Search, filter, category function | Apartments page + filters | Yes |
| FR-07 | Detail view for each record | Apartment detail + map | Yes |
| FR-08 | Status tracking | Availability status label | Yes |
| FR-05 | View records / roommate board | Roommate board | Partly |
| FR-03 | User input / submission | Owner add-listing form | Partly (owner side) |

## 4. MVP Experiment Type
Select one or combine more than one:
- Clickable prototype
- Landing page test
- Form-based simulation
- Dashboard demo
- Manual service simulation
- Simple web prototype
- Backend/database prototype

**Selected experiment type:** Simple web prototype (working clickable web app with a real backend).

**Reason for selection:** Our main risk is whether students can actually complete the core search-and-contact workflow and find the listings useful. We already have an interactive prototype, so testing the real screens gives the strongest evidence about usability and value before we invest more in the final build.

## 5. Test Users
| Test User Group | Number of Testers | Why They Are Relevant |
|---|---:|---|
| First-year / international students | 5 | They are the main target users and feel the housing-search pain most. |
| Senior students who recently searched | 3 | They can compare our tool to how they searched before. |
| Apartment owner (optional) | 1 | Tests the owner add-listing side of the workflow. |

## 6. Experiment Procedure Summary
Each tester opens the live prototype and is asked to complete a set of realistic tasks (search for a room under a budget, filter by distance, open a listing, check availability, view it on the map, and reach the contact-owner step). We observe whether they finish each task without help, time how long it takes, and note any confusion. After the tasks, each tester completes the feedback form.

## 7. Expected Learning
After the experiment we will decide whether to continue building the current design as-is, revise specific screens/flows/labels that testers struggle with, or revisit requirements if most testers fail the core tasks. The results directly guide our final prototype work.
