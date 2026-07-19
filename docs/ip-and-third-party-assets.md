# IP and Third-Party Assets Review

## Project

Student Apartment Finder Platform

## Review Method

The team reviewed the frontend and backend package files, external services, repository images, icons, diagrams, wireframes, screenshots, and project documentation. License information for software packages was checked against the installed versions recorded in `package-lock.json`.

## Third-Party Asset Register

| Asset / Resource | Type | Source / URL | License / Permission | How It Is Used | Credit Required? | Risk | Action |
|---|---|---|---|---|---|---|---|
| React and React DOM | JavaScript libraries | https://react.dev/ | MIT | Frontend user interface | Keep license notice when redistributing source | Low | Record in project acknowledgements |
| React Router | JavaScript library | https://reactrouter.com/ | MIT | Page routing and protected portal navigation | Keep license notice when redistributing source | Low | Record in project acknowledgements |
| Vite | Development/build tool | https://vite.dev/ | MIT | Frontend development and production build | Keep license notice when redistributing source | Low | Record in dependency register |
| TypeScript | Programming language/tooling | https://www.typescriptlang.org/ | Apache-2.0 | Frontend and backend type checking | Keep license and notice requirements | Low | Record in dependency register |
| Tailwind CSS | CSS framework | https://tailwindcss.com/ | MIT | Responsive layout and interface styling | Keep license notice when redistributing source | Low | Record in project acknowledgements |
| Lucide React | Icon library | https://lucide.dev/ | ISC | Navigation, action, status, and dashboard icons | Keep license notice | Low | Credit Lucide in project acknowledgements |
| Radix UI Slot | UI utility | https://www.radix-ui.com/ | MIT | Reusable button/component behavior | Keep license notice when redistributing source | Low | Record in dependency register |
| Recharts | Chart library | https://recharts.org/ | MIT | Dashboard and analytics charts | Keep license notice when redistributing source | Low | Record in project acknowledgements |
| Sonner | Notification library | https://sonner.emilkowal.ski/ | MIT | Success and error toast messages | Keep license notice when redistributing source | Low | Record in dependency register |
| class-variance-authority | UI styling utility | https://cva.style/ | Apache-2.0 | Reusable component variants | Keep license and notice requirements | Low | Record in dependency register |
| clsx and tailwind-merge | CSS utilities | https://github.com/lukeed/clsx and https://github.com/dcastil/tailwind-merge | MIT | Conditional and merged CSS class names | Keep license notices when redistributing source | Low | Record in dependency register |
| Supabase JavaScript client | JavaScript library | https://github.com/supabase/supabase-js | MIT | Connect backend to authentication, database, and storage services | Keep license notice | Low | Record library and version |
| Supabase hosted services | External cloud service | https://supabase.com/ | Subject to Supabase terms and privacy policy | Authentication, PostgreSQL database, and listing-photo storage | Service attribution not generally required; terms apply | Medium | Link privacy policy and review service terms before public launch |
| Google Maps JavaScript API Loader | JavaScript library | https://github.com/googlemaps/js-api-loader | Apache-2.0 | Loads Google Maps features | Keep license and notice requirements | Low | Record library and version |
| Google Maps Platform | External API/service | https://mapsplatform.google.com/ | Subject to Google Maps Platform Terms | Property map, coordinates, and external map links | Google attribution and terms must be preserved | Medium | Keep required Google attribution; restrict API keys and review usage terms |
| Express | Backend framework | https://expressjs.com/ | MIT | Backend API and routing | Keep license notice when redistributing source | Low | Record in dependency register |
| Zod | Validation library | https://zod.dev/ | MIT | Validates listing, message, authentication, and roommate inputs | Keep license notice when redistributing source | Low | Record in dependency register |
| Multer | File-upload middleware | https://github.com/expressjs/multer | MIT | Processes listing-photo uploads | Keep license notice when redistributing source | Low | Record in dependency register |
| CORS and cookie-parser | Express middleware | https://github.com/expressjs/cors and https://github.com/expressjs/cookie-parser | MIT | Cross-origin policy and authentication-cookie parsing | Keep license notices when redistributing source | Low | Record in dependency register |
| dotenv | Configuration library | https://github.com/motdotla/dotenv | BSD-2-Clause | Loads local environment configuration | Keep copyright and license notice | Low | Record in dependency register; never commit real secrets |
| Landing-page room photograph (`landing-student-room.webp`) | Image | Source not documented in repository | Unknown | Main homepage visual | Unknown | High | Identify original creator and permission; replace with a team-created or verified open-license image if proof cannot be found |
| Listing photographs uploaded by owners | User-supplied images | Supplied by listing owners | Uploader permission required | Apartment cards, detail pages, and galleries | Depends on source | High | Require uploaders to own or have permission; prohibit copied images, faces, IDs, and private documents; remove disputed images |
| `favicon.svg` | Team-created SVG icon | Repository source file | Team-created, subject to team confirmation | Browser icon | No external credit if confirmed team-created | Low | Confirm creator in issue or commit history and record as team-created |
| `icons.svg` branded/social symbols | SVG icon collection | Source not documented in repository | Unknown; may include third-party trademarks or copied paths | Currently not referenced by application code | Unknown | High | Remove if unused; otherwise identify each source, follow brand guidelines, and document permission |
| Wireframes | Project diagrams/images | Created by project team | Team-created | Lab 05 interface planning | No external credit | Low | Record responsible team members and commit links |
| System, data-flow, use-case, and user-flow diagrams | Project diagrams | Created by project team | Team-created | Architecture and workflow documentation | No external credit | Low | Record responsible team members and source files |
| Validation screenshots | Project evidence | Captured by project team | Team-created; may contain third-party UI and personal data | Lab 08 testing evidence | No external credit, but privacy review required | Medium | Check screenshots for names, emails, messages, API keys, and other private information before public upload |
| Sample and validation datasets | Project data | Collected or prepared by project team | Team-created with participant consent; anonymization required | Customer validation and analytics | No external credit unless another dataset is used | Medium | Use participant codes, remove identifiers, and document consent/source |
| AI-assisted text or code, if used | AI-assisted material | Tool and prompts used by team | Tool terms apply; human review required | Possible drafting, coding, or editing support | Declare according to course rules | Medium | Team must disclose actual AI assistance, verify accuracy, and avoid claiming unreviewed AI output as independent human work |

## Development and Testing Dependencies

The repository also uses development packages such as Vitest, Supertest, tsx, Oxlint, and type-definition packages. Their versions and licenses are recorded in the package lock files. They should remain in the dependency register even though they are not part of the user-facing interface.

## High-Priority Findings

1. The source and permission for `landing-student-room.webp` are not documented. This asset must be verified or replaced.
2. `public/icons.svg` contains recognizable third-party brand symbols, but its source and permission are not documented and the file appears unused. Remove it if it is unnecessary.
3. User-uploaded apartment photos require permission and moderation because public image URLs can be copied or shared.
4. Google Maps and Supabase are external services governed by their own terms and privacy rules in addition to the open-source client-library licenses.
5. Validation screenshots and datasets require a privacy check before they remain in the public repository.
6. Any actual AI assistance must be disclosed according to the professor's or university's rules; the team must not invent or hide usage information.

## IP Decision

**Continue with mitigation.** The main software dependencies use recognized open-source licenses and can remain in the prototype when their license requirements are respected. The undocumented landing image and unused branded SVG collection remain high-risk until their sources are confirmed or they are replaced/removed.

## GitHub Evidence

- Issue: add the URL for `Review IP and Third-Party Assets`
- Commit: add the commit URL after uploading this file
