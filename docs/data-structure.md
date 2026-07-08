# Data Structure

## Project Title

Student Apartment Finder Platform

## 1. Main Data Entities / Tables

| Entity / Table     | Purpose                                                                                   | Example Records                                                   |
| ------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Users              | Stores basic role-based user information for students, apartment owners, and admin users. | Student user, apartment owner, admin                              |
| Apartment Listings | Stores apartment and condo listing information submitted by apartment owners.             | Atmoz Kanaal Rangsit, Kave Town Island, Plum Condo Park Rangsit   |
| Saved Listings     | Stores apartments saved or shortlisted by student users.                                  | Student saves Atmoz Kanaal Rangsit                                |
| Roommate Posts     | Stores roommate search posts created by students.                                         | Student looking for roommate near Rangsit University              |
| Listing Reviews    | Stores admin approval status and review notes for apartment listings.                     | Approved listing, rejected listing, pending review                |
| Dashboard Metrics  | Stores or calculates summary values for the admin dashboard.                              | Total listings, available rooms, pending listings, roommate posts |

## 2. Field Definition

| Entity             | Field Name          | Data Type | Required? | Example Value                                     | Validation Rule                                    | Used For Search/Filter? |
| ------------------ | ------------------- | --------- | --------- | ------------------------------------------------- | -------------------------------------------------- | ----------------------- |
| Users              | user_id             | Text/ID   | Yes       | U001                                              | Unique value                                       | No                      |
| Users              | full_name           | Text      | Yes       | Aung Min                                          | Must not be empty                                  | Yes                     |
| Users              | email               | Text      | Yes       | [student@example.com](mailto:student@example.com) | Must use valid email format                        | Yes                     |
| Users              | role                | Text/List | Yes       | Student                                           | Student / Owner / Admin only                       | Yes                     |
| Users              | created_at          | Date      | Yes       | 2026-07-08                                        | Valid date format                                  | No                      |
| Apartment Listings | listing_id          | Text/ID   | Yes       | APT001                                            | Unique value                                       | Yes                     |
| Apartment Listings | apartment_name      | Text      | Yes       | Atmoz Kanaal Rangsit                              | Must not be empty                                  | Yes                     |
| Apartment Listings | property_type       | Text/List | Yes       | Condo                                             | Apartment / Condo / Dormitory only                 | Yes                     |
| Apartment Listings | near_university     | Text/List | Yes       | Rangsit University                                | Rangsit University / Bangkok University            | Yes                     |
| Apartment Listings | area                | Text      | Yes       | Rangsit, Pathum Thani                             | Must not be empty                                  | Yes                     |
| Apartment Listings | distance_km         | Number    | Yes       | 2.8                                               | Must be 0 or greater                               | Yes                     |
| Apartment Listings | monthly_price_thb   | Number    | Yes       | 13000                                             | Must be greater than 0                             | Yes                     |
| Apartment Listings | room_type           | Text/List | Yes       | 1 Bedroom                                         | Studio / 1 Bedroom / 2 Bedroom / Shared Room       | Yes                     |
| Apartment Listings | facilities          | Text/List | No        | Wi-Fi, Air Conditioning, Security                 | Can contain multiple facility values               | Yes                     |
| Apartment Listings | availability_status | Text/List | Yes       | Available                                         | Available / Unavailable / Available Within 30 Days | Yes                     |
| Apartment Listings | approval_status     | Text/List | Yes       | Approved                                          | Pending Review / Approved / Rejected               | Yes                     |
| Apartment Listings | owner_id            | Text/ID   | Yes       | U002                                              | Must match an owner user_id                        | No                      |
| Apartment Listings | image_url           | Text/URL  | No        | sample image URL                                  | Must be valid URL if provided                      | No                      |
| Apartment Listings | description         | Text      | No        | Student-friendly condo near campus                | Maximum reasonable length                          | No                      |
| Saved Listings     | saved_id            | Text/ID   | Yes       | S001                                              | Unique value                                       | No                      |
| Saved Listings     | user_id             | Text/ID   | Yes       | U001                                              | Must match a student user_id                       | No                      |
| Saved Listings     | listing_id          | Text/ID   | Yes       | APT001                                            | Must match listing_id                              | No                      |
| Saved Listings     | saved_at            | Date      | Yes       | 2026-07-08                                        | Valid date format                                  | No                      |
| Roommate Posts     | roommate_post_id    | Text/ID   | Yes       | RMP001                                            | Unique value                                       | Yes                     |
| Roommate Posts     | user_id             | Text/ID   | Yes       | U001                                              | Must match a student user_id                       | No                      |
| Roommate Posts     | title               | Text      | Yes       | Looking for roommate near RSU                     | Must not be empty                                  | Yes                     |
| Roommate Posts     | near_university     | Text/List | Yes       | Rangsit University                                | Rangsit University / Bangkok University            | Yes                     |
| Roommate Posts     | budget_range_thb    | Text      | Yes       | 4000-6000                                         | Must show valid budget range                       | Yes                     |
| Roommate Posts     | move_in_date        | Date/Text | No        | August 2026                                       | Valid date or month format                         | Yes                     |
| Roommate Posts     | lifestyle_tags      | Text/List | No        | Quiet, Clean, No smoking                          | Can contain multiple values                        | Yes                     |
| Roommate Posts     | post_status         | Text/List | Yes       | Open                                              | Open / Closed                                      | Yes                     |
| Listing Reviews    | review_id           | Text/ID   | Yes       | REV001                                            | Unique value                                       | No                      |
| Listing Reviews    | listing_id          | Text/ID   | Yes       | APT001                                            | Must match listing_id                              | No                      |
| Listing Reviews    | admin_id            | Text/ID   | Yes       | U003                                              | Must match an admin user_id                        | No                      |
| Listing Reviews    | review_status       | Text/List | Yes       | Approved                                          | Pending Review / Approved / Rejected               | Yes                     |
| Listing Reviews    | review_note         | Text      | No        | Listing details are clear                         | Optional admin note                                | No                      |
| Listing Reviews    | reviewed_at         | Date      | No        | 2026-07-08                                        | Valid date format                                  | No                      |
| Dashboard Metrics  | metric_id           | Text/ID   | Yes       | M001                                              | Unique value                                       | No                      |
| Dashboard Metrics  | metric_name         | Text      | Yes       | Total Listings                                    | Must not be empty                                  | No                      |
| Dashboard Metrics  | metric_value        | Number    | Yes       | 12                                                | Must be 0 or greater                               | No                      |
| Dashboard Metrics  | metric_type         | Text/List | Yes       | Listing                                           | Listing / User / Roommate / Status                 | Yes                     |

## 3. Status Values

| Status                   | Meaning                                                                             | Who Can Update?         |
| ------------------------ | ----------------------------------------------------------------------------------- | ----------------------- |
| Pending Review           | A new listing has been submitted but has not been reviewed yet.                     | Admin                   |
| Approved                 | The listing has been checked and can be shown to students.                          | Admin                   |
| Rejected                 | The listing is not accepted because information is missing, invalid, or unsuitable. | Admin                   |
| Available                | The room is currently available for rent.                                           | Apartment Owner / Admin |
| Unavailable              | The room is currently not available.                                                | Apartment Owner / Admin |
| Available Within 30 Days | The room is not available now but will become available soon.                       | Apartment Owner / Admin |
| Open                     | A roommate post is still active.                                                    | Student / Admin         |
| Closed                   | A roommate post is no longer active.                                                | Student / Admin         |

## 4. Sample Records

The sample dataset will be stored in:

```text
/data/sample-records.csv
```

The sample records should include apartment and condo examples near:

* Rangsit University
* Bangkok University
* Rangsit
* Pathum Thani
* Khlong Luang
* Thanyaburi

Example records can include sample apartment names such as:

* Atmoz Kanaal Rangsit
* Sena Eco Town Rangsit Station
* The Enrich Rungsit
* Kave Town Island
* Plum Condo Park Rangsit
* Attitude BU

All owner names, emails, and phone numbers must be fake sample data.

## 5. Data Privacy Note

The prototype will not collect unnecessary sensitive personal data. The system only needs basic data required for apartment searching, listing management, and student support.

The following data will not be collected in the prototype:

* National ID or passport number
* Real bank account information
* Payment card information
* Full home address of students
* Private documents
* Sensitive personal information

All sample records will use fake names, fake emails, masked phone numbers, and mock data. Real apartment or condo names may be used only as location-style examples, but real owner contact information will not be used.
