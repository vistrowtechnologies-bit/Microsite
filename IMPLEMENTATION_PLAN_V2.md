# Nestory Implementation Plan V2

## 1. Product goal

Build the fastest WhatsApp-first property presentation platform for Indian
brokers and channel partners.

A broker should be able to upload a developer's complete information package in
one action—PDF brochures, price sheets, floor plans, images and copied text.
Nestory extracts and organises the material, flags uncertain or missing facts,
and creates a premium mobile-first property microsite that the broker can review,
publish and share as one tracked link.

### North-star promise

**Upload everything once. Review the facts. Share one beautiful link.**

### Target outcome

- First draft generated in under 3 minutes for a typical project package.
- Broker review and publishing completed in under 5 minutes.
- A personalised link shared with a client in under 20 seconds.
- Every published fact can be traced back to an uploaded source or a broker edit.
- Buyers can understand the project and contact the broker without installing an
  app or signing in.

## 2. Current-product audit

### What already works in the demo

- Clear problem statement around sending too many WhatsApp attachments.
- Premium light Cobalt + Orange design direction.
- Marketing page, dashboard and My Properties library.
- Four-step manual property creation flow.
- Mobile-first public project page with gallery and key facts.
- Amenities, documents, EMI calculator, QR code and WhatsApp/call actions.
- Responsive desktop and mobile layouts.

### Marketing-page gaps

1. The AI transformation is not the hero of the story.
2. “Upload everything” is followed by manual data entry instead of a visible
   extraction-and-review experience.
3. There is no before/after demonstration of messy files becoming structured
   content.
4. There is no interactive sample upload, short product video or real generated
   result.
5. There is no trust explanation for private developer documents, data deletion
   or AI accuracy.
6. There is no clear explanation of source-backed extraction and broker approval.
7. CP-specific benefits—multi-project library, live price updates, personalised
   links and attribution—are not prominent.
8. Social proof, customer quotes, case studies and measurable outcomes are
   missing.
9. Pricing is shown before the product value and limits are fully explained.
10. FAQ, support, privacy, terms and contact details are incomplete.

### Public-microsite gaps

1. No configuration and availability table for unit types.
2. No dedicated interactive floor-plan section.
3. No complete price breakdown or “last updated” indicator.
4. No map, landmark travel times or neighbourhood context.
5. No RERA number, verification status or regulatory-document section.
6. No construction status, possession timeline or update gallery.
7. No developer profile or past-project trust information.
8. No video walkthrough or 360-degree tour.
9. No site-visit booking, callback form or lightweight lead capture.
10. No buyer FAQ, shortlist or comparison experience.
11. No similar projects from the same broker.
12. No personalised welcome or client-specific share link.
13. No language switch for English, Hindi and Marathi.
14. No visible page-update history or document-version status.

### Dashboard and workflow gaps

1. Login, signup, OTP verification and password recovery are not implemented.
2. There is no organisation or broker-profile onboarding.
3. Upload currently accepts files visually but does not store or process them.
4. There is no extraction progress, source viewer, confidence score or conflict
   resolution.
5. There is no full page editor or autosaved draft.
6. Analytics, leads, settings and billing navigation are placeholders.
7. There is no document versioning, client-link manager or activity timeline.
8. The current data is static and not tenant-isolated.

## 3. Product positioning and defensible USP

Global tools already prove that automated listing sites are valuable. Boldly
turns an MLS PDF into a site and QR code; Curb accepts listing links, sheets and
screenshots and generates multiple marketing assets; Alcove creates several
branded formats from one photo upload.

Nestory should not compete as another generic AI listing writer. Its focused
position should be:

> **The developer-package-to-client-link workspace for Indian brokers and CPs.**

### Differentiation

- Accept the actual inputs Indian CPs receive: developer brochures, price-list
  PDFs, cost sheets, floor plans, location maps, WhatsApp text and image folders.
- Extract one structured project record from all sources in a single batch.
- Show the source behind every important fact; never silently invent details.
- Handle conflicting prices, carpet areas and possession dates through a review
  queue.
- Update a price sheet once while keeping every previously shared URL live.
- Generate client-specific smart links without duplicating the project.
- Track repeat visits, downloads, WhatsApp taps and site-visit intent per link.
- Produce timestamped engagement evidence for lead-attribution discussions.
- Keep the buyer experience fast, calm and free from competing portal listings.
- Support Indian price formats, BHK configurations, RERA data and regional
  languages.

## 4. Primary user journey

### Stage A — Signup and login

#### Screens

1. `/signup`
   - Full name
   - Mobile number
   - Work email
   - Password or passwordless option
   - Terms and privacy consent
2. `/verify`
   - Mobile or email OTP
   - Resend and change-number actions
3. `/login`
   - Mobile/email plus OTP
   - Optional password login
4. `/forgot-password`

#### Rules

- Phone-first experience for Indian brokers; email remains available.
- One account can belong to one or more organisations later.
- Session works across web, Android and iOS.
- Rate limiting, CAPTCHA after suspicious attempts and audit logs are required.

### Stage B — First-time onboarding

Use a short wizard with progress and autosave.

1. **Your role**
   - Independent broker
   - Channel partner
   - Brokerage/team
2. **Business profile**
   - Business name, city, markets served and team size
3. **Public identity**
   - Profile image, logo, RERA registration, WhatsApp number and call number
4. **Brand defaults**
   - Accent choice within Nestory's approved system
   - Default contact message
   - Language preference
5. **First success action**
   - “Create my first project with AI”
   - A sample project is available for users without files

The dashboard opens only after the minimum public identity is complete. Optional
fields can be skipped and completed later.

### Stage C — One-shot AI project creation

The primary dashboard action is **Create with AI**.

#### Intake screen: `/properties/new`

One large workspace accepts all inputs together:

- Drag and drop multiple PDFs, JPG, PNG, WebP, DOCX and XLSX files.
- Paste WhatsApp or email text into a text box.
- Select many files from mobile storage or camera.
- Optional developer/project URL for reference.
- Optional language selection.

Show:

- Upload queue and individual progress.
- File type, size and duplicate warning.
- Remove/replace controls.
- Privacy notice.
- “Generate project draft” primary action.
- “Create manually instead” secondary action.

#### Processing screen: `/properties/[id]/processing`

Use a transparent pipeline instead of an indefinite spinner:

1. Securing uploads
2. Reading brochures and text
3. Finding project facts
4. Sorting photos and floor plans
5. Comparing prices and configurations
6. Writing buyer-friendly content
7. Building the microsite draft

The process can continue in the background. The broker receives an in-app and
push notification when the draft is ready.

#### AI extraction pipeline

1. Validate file type, malware scan and tenant ownership.
2. Extract native PDF text.
3. Run OCR on scanned pages and images.
4. Detect page types: cover, overview, amenities, floor plan, price table,
   location map, specification or legal page.
5. Extract a strict property schema.
6. Classify images and remove exact or near duplicates.
7. Associate floor plans with configurations.
8. Parse price tables without converting them into unverified marketing claims.
9. Detect conflicting facts across sources.
10. Generate concise, source-grounded buyer copy.
11. Calculate a completeness score and per-field confidence.
12. Store source citations for every extracted field.

#### AI safety rules

- Never publish automatically.
- Never invent a price, area, amenity, RERA number or possession date.
- Mark ambiguous values as “Needs review.”
- Preserve the original files.
- Show exactly which file and page produced each fact.
- Label broker edits separately from extracted information.

### Stage D — Review and edit

Route: `/properties/[id]/review`

Use a three-part review workspace:

- Left: section checklist and completeness score.
- Centre: editable structured project content.
- Right: source PDF/image and the highlighted extraction evidence.

#### Review sections

1. Project identity
2. Location and developer
3. RERA and possession
4. Configurations and carpet areas
5. Pricing and cost notes
6. Project highlights
7. Amenities
8. Floor plans
9. Gallery
10. Location landmarks
11. Documents and downloads
12. Broker contact and branding

#### Review behaviour

- High-confidence fields appear ready.
- Low-confidence fields require confirmation.
- Conflicts show both values and their sources.
- Missing required fields show a clear action.
- Broker can reorder gallery images and select the cover.
- Broker can hide sections with no useful data.
- Autosave every change.
- AI rewrite is available for descriptions, but facts remain locked to the
  structured record.

### Stage E — Microsite preview and publishing

Route: `/properties/[id]/preview`

- Desktop/mobile preview switch.
- Section visibility and order.
- Cover image and social-preview editor.
- Public slug preview.
- Search visibility setting.
- Download/privacy controls.
- WhatsApp/call CTA verification.
- Final checklist for missing critical facts.

Publishing creates:

- Stable public URL: `/p/[slug]`
- QR code
- WhatsApp/social preview metadata
- Default share message
- Analytics record

### Stage F — Share with a client

The Share panel offers:

1. Copy general link
2. Share on WhatsApp
3. Create a personalised smart link
4. Download QR code
5. Download a one-page share card later

#### Personalised smart link

Broker selects:

- Client name
- Interested configuration
- Optional budget
- Optional expiry
- Hidden or gated documents
- Prefilled WhatsApp response

The system creates one lightweight link record attached to the master project.
The property itself is never duplicated.

### Stage G — Analytics and follow-up

Route: `/properties/[id]/analytics`

Show:

- Total and unique visits
- Repeat visitors
- Engagement time
- Gallery, floor-plan and document interactions
- WhatsApp, call, callback and site-visit actions
- Traffic source and QR scans
- Activity by personalised link
- Recent high-intent visitors

Privacy-safe anonymous analytics remain separate from identified leads until the
buyer submits details or uses a personalised link.

## 5. Marketing website structure

### Page 1 — Home

1. **Hero**
   - Headline: “Turn every developer file into one property link.”
   - Supporting copy explains PDF, text and image upload.
   - Primary CTA: “Create with AI”
   - Secondary CTA: “See a generated example”
2. **Input-to-output demonstration**
   - Left: brochure, price sheet, images and WhatsApp text
   - Centre: extraction progress
   - Right: finished phone microsite
3. **Problem**
   - Visual comparison: 15 attachments versus one organised link
4. **How it works**
   - Upload everything
   - Review extracted facts
   - Publish and share
5. **What AI extracts**
   - Price, BHK, carpet area, possession, RERA, amenities, floor plans,
     landmarks, gallery and documents
6. **Buyer experience**
   - Mobile microsite walkthrough
7. **CP workflow**
   - Project library, instant updates and repeated sharing
8. **Smart links and attribution**
   - Explain personalised links and lead-ownership timeline
9. **Trust and control**
   - Private uploads, source-backed facts, manual approval and deletion
10. **Customer proof**
    - Quotes, time saved and attachment-reduction metrics
11. **Pricing**
    - Clear limits for active projects, storage, AI processing and team members
12. **FAQ**
13. **Final CTA**
14. **Complete footer**

### Supporting marketing pages

- `/features/ai-import`
- `/features/microsites`
- `/features/smart-links`
- `/features/analytics`
- `/for-channel-partners`
- `/for-brokers`
- `/pricing`
- `/examples`
- `/security`
- `/help`
- `/contact`
- `/privacy`
- `/terms`

## 6. Complete public microsite structure

The default mobile order should be:

1. Compact broker trust bar
2. Photo/video gallery
3. Project title, location, developer and RERA status
4. Price, configuration, carpet area and possession summary
5. Sticky WhatsApp, call and site-visit actions
6. Project story and key highlights
7. Configuration selector
8. Floor plans with zoom
9. Pricing and EMI calculator
10. Amenities grouped by lifestyle
11. Location map and landmark travel times
12. Construction status and possession timeline
13. Video or 360 tour
14. Developer profile
15. Documents with update dates
16. Buyer FAQ
17. Similar projects or broker shortlist
18. Broker profile and enquiry form
19. Price disclaimer, last updated date and regulatory footer

Each empty section should disappear cleanly rather than showing placeholders.

## 7. Dashboard information architecture

- Overview
- Properties
  - All properties
  - Drafts
  - Processing
  - Published
  - Archived
- Upload centre
- Leads
- Smart links
- Analytics
- Documents
- Team
- Billing
- Brand settings
- Account and security

### Property workspace tabs

- Overview
- Content
- Media
- Pricing
- Documents
- Microsite
- Share links
- Leads
- Analytics
- Activity

## 8. Core data structure

### Identity and tenancy

- `users`
- `organizations`
- `organization_members`
- `broker_profiles`
- `brand_profiles`

### Project data

- `properties`
- `property_configurations`
- `property_prices`
- `property_amenities`
- `property_landmarks`
- `property_documents`
- `property_media`
- `property_floorplans`
- `property_rera_records`
- `property_updates`

### AI ingestion

- `ingestion_jobs`
- `source_files`
- `source_pages`
- `extracted_fields`
- `extraction_conflicts`
- `ai_generations`
- `review_tasks`

Every `extracted_field` should store:

- property ID
- field path
- extracted value
- confidence
- source file ID
- source page
- source bounding area when available
- status: suggested, confirmed, edited or rejected
- confirmed by and confirmed at

### Publishing and engagement

- `microsites`
- `microsite_sections`
- `share_links`
- `link_visits`
- `engagement_events`
- `leads`
- `lead_activities`
- `site_visit_requests`
- `document_versions`

## 9. System architecture

### Web

- Next.js and TypeScript
- Responsive broker dashboard and public microsites
- Server-side rendering for fast public links and social previews

### Backend

- Supabase Auth, Postgres and Storage
- Row Level Security for tenant isolation
- Background job queue for extraction work
- Signed URLs for private source documents

### AI/document processing

- PDF text extraction plus OCR fallback
- Structured schema extraction with validation
- Image classification, duplicate detection and metadata cleanup
- Retrieval from uploaded sources during copy generation
- Per-field provenance and confidence

### Mobile

- Expo React Native for Android and iOS after the web workflow stabilises
- Same authentication, database, storage and share links
- Background uploads and offline draft queue

## 10. Delivery phases

### Phase 0 — Product foundation

**Goal:** agree on the schema and complete buyer experience before backend work.

- Finalise field schema and required/optional rules.
- Finalise microsite component order.
- Define extraction confidence and conflict behaviour.
- Update marketing message around one-shot AI import.

**Exit:** clickable end-to-end prototype covers signup through sharing.

### Phase 1 — Authentication and real dashboard

**Goal:** a broker can create an account and securely manage an isolated workspace.

- Supabase setup, migrations and RLS.
- Signup, OTP login, recovery and session handling.
- Organisation and broker onboarding.
- Real property CRUD and autosaved drafts.

**Exit:** two test tenants cannot access each other's data.

### Phase 2 — Upload and AI draft generation

**Goal:** convert one mixed developer package into a structured draft.

- Multi-file upload and pasted text.
- Storage, job status and retry behaviour.
- PDF/OCR extraction.
- Strict property schema and evidence mapping.
- Image/floor-plan classification.
- Completeness, confidence and conflict UI.

**Exit:** representative Pune developer packages generate reviewable drafts
without invented critical facts.

### Phase 3 — Review editor and complete microsite

**Goal:** publish a buyer-ready project after a fast human review.

- Source-backed review workspace.
- Gallery and floor-plan editor.
- Pricing, RERA, map, documents and FAQ.
- Mobile-first public page.
- Preview, slug, QR and social card.

**Exit:** broker publishes a complete microsite in under 5 minutes.

### Phase 4 — Sharing, leads and analytics

**Goal:** turn a microsite into an attributable broker sales tool.

- General and personalised links.
- WhatsApp messages and QR codes.
- Engagement events.
- Lead capture, callback and site-visit requests.
- High-intent alerts and attribution export.

**Exit:** a broker can identify which shared link produced each known lead.

### Phase 5 — Production readiness and billing

**Goal:** operate the product safely as a paid multi-tenant SaaS.

- Subscription and usage limits.
- Storage and AI-credit metering.
- Admin support console.
- Audit logs, retention, deletion and export.
- Monitoring, backups, rate limits and abuse protection.
- Privacy, terms, security and support content.

**Exit:** pilot customers can be onboarded and billed reliably.

### Phase 6 — Android and iOS apps

**Goal:** let brokers upload, update and share projects while mobile.

- Expo app with shared authentication and types.
- Properties, upload, review, share, leads and alerts.
- Background uploads and offline queue.
- Android APK/AAB and iOS TestFlight builds.

**Exit:** the same broker account and project data work across web, Android and
iOS.

## 11. MVP boundary

### Include in the first paid pilot

- Phone/email authentication
- Broker onboarding
- PDF, image and pasted-text batch upload
- AI extraction with evidence and manual review
- One microsite template
- Gallery, facts, configurations, floor plans, pricing, amenities, map,
  documents and contact
- EMI calculator and QR code
- Stable link and WhatsApp share
- Basic views, document clicks and CTA analytics
- Live property editing and document replacement

### Defer until after pilot validation

- Multiple visual templates
- Full social-media content studio
- Flyer and yard-sign generation
- AI chatbot
- Custom domains
- Team roles beyond owner/member
- Advanced CRM integrations
- Automatic WhatsApp inbox ingestion
- Full multilingual AI translation
- Native mobile apps

## 12. Product metrics

### Activation

- Signup-to-first-upload rate
- Upload-to-generated-draft completion
- Draft-to-publish conversion
- Median time to first published microsite

### Usage

- Active projects per broker
- Links shared per project
- Returning brokers per week
- Price/document updates per project

### Buyer engagement

- Microsite open rate
- Median engaged time
- Floor-plan and document interaction
- WhatsApp/call/site-visit conversion

### AI quality

- Extraction accuracy by field
- Low-confidence rate
- Conflict rate
- Broker correction rate
- Processing time and job-failure rate

## 13. Immediate build order

1. Redesign the marketing hero and “How it works” around mixed-file AI import.
2. Design login, OTP and five-step onboarding.
3. Replace the manual new-property wizard with the one-shot intake workspace.
4. Add processing and source-backed review screens.
5. Expand the public microsite with configurations, floor plans, price details,
   map, RERA, timeline, FAQs and enquiry actions.
6. Define and implement the Supabase schema, storage rules and RLS.
7. Connect real upload, extraction, review and publishing.
8. Add smart links, analytics and lead attribution.

## 14. Reference products reviewed

- Boldly: https://boldlyhq.com/
- Curb: https://www.curb.homes/
- Alcove AI: https://alcove-ai.com/
- ListingAI: https://realestatelisting.ai/

