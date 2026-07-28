# Final Venture Pitch Outline

**Recommended pitch duration:** 7–10 minutes  
**Project:** Student Apartment Finder Platform  
**Team:** 3idiots

## Slide 1: Project Title and Team

### Title

Student Apartment Finder Platform

### One-Sentence Introduction

A centralized platform that helps university students find, compare, and contact suitable apartments near campus.

### Team

- **Phyo Wai Aung:** Product Lead and Validation Lead
- **Kyaw Linn:** Technical Lead and UX/UI Lead
- **Arkar Kyaw Oo:** Documentation Lead

## Slide 2: Problem and Target Users

### Problem

Apartment information is scattered across Facebook groups, rental agents, websites, and personal recommendations. Information may be incomplete, outdated, difficult to compare, or unclear about price, facilities, distance, availability, and location.

### Target Users

- First-year university students
- International students
- Students searching for off-campus housing
- Students planning to move
- Apartment landlords
- Platform administrators

### Why It Matters

Students waste time searching through multiple sources and may make housing decisions without reliable or comparable information.

## Slide 3: Evidence from Customer Discovery and Validation

### Customer-Discovery Findings

- Students rely heavily on social media groups, agents, and recommendations.
- Apartment information is difficult to compare.
- Price, location, facilities, and availability are important decision factors.
- First-year and international students have less local knowledge.

### Testing Evidence

- Lab 13 used five simulated tester profiles.
- Fifteen task attempts were evaluated.
- Twelve attempts were completed successfully.
- Three attempts were partially completed.
- No task completely failed.
- The average simulated feedback score was approximately 4.1 out of 5.

### Honest Limitation

The simulated evidence supports usability planning but does not replace future testing with real external students and landlords.

## Slide 4: Solution and Value Proposition

### Solution

The Student Apartment Finder brings approved apartment information into one searchable and comparable platform.

### Main Value

For university students who struggle with scattered and unreliable accommodation information, the platform helps them find suitable apartments near campus by providing centralized listings with prices, distance, facilities, photographs, availability, landlord contact information, and map locations.

### Stakeholder Value

- **Students:** Faster and more confident comparison.
- **Landlords:** Structured access to student renters.
- **Administrators:** Listing review, moderation, and platform oversight.

## Slide 5: Final Prototype Demonstration Flow

1. Open the homepage.
2. Browse approved apartment listings.
3. Search and apply filters.
4. Open an apartment detail page.
5. Review price, facilities, photographs, availability, contact, and map location.
6. Open the landlord listing-submission form.
7. Show administrator listing and roommate moderation.
8. Explain the administrator dashboard and metrics.
9. Connect the demonstrated screens to FR-01–FR-12.

## Slide 6: Business Model Canvas Summary

### Customer Segments

- First-year and international university students
- Students searching for off-campus accommodation
- Students seeking roommates
- Apartment landlords near universities
- Universities or student-support organizations

### Value Propositions

- Centralized and comparable apartment information
- Faster apartment discovery for students
- Structured listing submission for landlords
- Reviewed listings and moderation
- Map-based location information
- Roommate-search support

### Channels

- Product landing page
- University student groups
- Social media
- Student clubs and orientation activities
- Landlord outreach
- Referrals from existing users

### Customer Relationships

- Self-service apartment discovery
- Direct landlord inquiries
- Platform moderation and listing review
- Feedback collection and user testing

### Possible Revenue Direction

- Optional promoted listings for landlords
- Landlord subscription or listing-management services
- Verified-listing or premium visibility services
- Future university or accommodation-partner agreements

The core student search should remain accessible so that revenue decisions do not reduce user trust.

### Key Costs

- Hosting and database services
- Platform development and maintenance
- Map and location services
- Moderation and listing verification
- Marketing and landlord recruitment

## Slide 7: Product Metrics and User-Testing Findings

### Current Product Data

- Six sanitized approved apartment records in the final sample dataset
- Monthly prices from THB 3,000 to THB 10,500
- Approximate average monthly price: THB 6,817
- Records are demonstrated without private landlord contact information

### Lab 13 Simulated Testing

- Five role-based tester profiles
- Fifteen task attempts
- Twelve successful attempts
- Three partial attempts
- No complete failures
- Approximate average feedback score: 4.1 out of 5

### Lab 14 Final Simulated Check

- Eight final checks
- Six successful checks
- Two partial checks
- Remaining partial areas: landlord-form guidance and validation

## Slide 8: Technical Architecture and Data Handling

### Architecture Overview

1. Users access the web interface through a browser.
2. Student, landlord, and administrator roles receive different platform views and actions.
3. The application processes listing, search, status, moderation, and dashboard functions.
4. Supabase supports the project’s database integration.
5. Google Maps supports apartment-location display.
6. The deployed application is hosted through Render.

### Data Handled

- Apartment names and descriptions
- Monthly rent
- University and location information
- Room details and facilities
- Availability and approval status
- Apartment photographs
- Landlord-submitted contact information
- Roommate posts
- Dashboard summaries and metrics

### Responsible Data Practice

The final demonstration dataset excludes passwords, access tokens, unnecessary private information, and direct landlord email addresses.

## Slide 9: Final Improvements and Future Development

### Important Current Improvements

- Clarify landlord-form location and photograph instructions.
- Verify final form validation.
- Improve inquiry-action visibility.
- Clarify administrator and roommate moderation controls.
- Improve filter and status explanations.

### Future Development

- Test with more real students and landlords.
- Add more verified apartment listings.
- Improve mobile accessibility.
- Add stronger inquiry and notification tracking.
- Improve roommate safety and reporting.
- Expand privacy-safe product metrics.
- Create a process for identifying outdated listings.
- Evaluate sustainable revenue options.

## Slide 10: Closing and Q&A

### Closing Message

The Student Apartment Finder Platform transforms scattered apartment information into a more organized, searchable, and understandable student-housing experience.

The prototype demonstrates a connected student, landlord, and administrator workflow supported by requirements, data, testing, responsible-design checks, and GitHub evidence.

### Final Call to Action

- Students: Try the platform and compare apartments.
- Landlords: Submit accurate accommodation information.
- Universities and partners: Support reliable student-housing access.

### Closing Line

“Finding suitable student accommodation should not depend on searching through scattered and unreliable information. Our platform brings the important details together so students can make more confident housing decisions.”

## Q&A Preparation

Be ready to answer:

- How were requirements connected to the prototype?
- Which testing was simulated and which evidence came from real platform data?
- How are apartment listings reviewed?
- How does the platform protect private information?
- What remains partially completed?
- How could the product generate revenue?
- What would the team build next?

