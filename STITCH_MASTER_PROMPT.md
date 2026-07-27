# Google Stitch Master Prompt — Nestory Web Demo

Copy everything below into a new Google Stitch project.

---

Create a complete, high-fidelity, production-ready responsive web application
design for **Nestory**, a property microsite platform for Indian real-estate
brokers and channel partners.

Generate the entire product as one connected design project on the same canvas.
Every required screen must have:

- One desktop frame at 1440 px width.
- One mobile frame at 390 px width.
- Consistent reusable components and design tokens.
- Realistic content and polished empty, loading, success and error states where
  relevant.
- Logical prototype connections between primary actions and their destination
  screens.

Do not create isolated visual concepts with inconsistent styling. Treat this as
one real SaaS product with a single shared component library.

## Product objective

Nestory lets a broker or channel partner upload property information once and
turn it into a beautiful Airbnb-style public property microsite. The broker
shares one link instead of sending 10–15 photos, brochures, floor plans and
price sheets separately on WhatsApp.

The experience has two audiences:

1. Brokers and channel partners managing properties in a private dashboard.
2. Prospective buyers opening a public property microsite from WhatsApp without
   signing in or installing an app.

The current deliverable is a browser-first responsive web demo. Design mobile
layouts carefully enough to become the visual foundation for a future Flutter
Android and iOS application.

## Brand personality

Nestory should feel:

- Clean and premium like a well-designed Airbnb property listing.
- Confident, warm and highly trustworthy.
- Modern but not like a generic blue enterprise dashboard.
- Editorial and photography-led on public property pages.
- Efficient and calm inside the broker dashboard.
- Designed specifically for Indian property professionals and buyers.

Avoid:

- Dark themes.
- Heavy gradients.
- Glassmorphism.
- Neon effects.
- Generic purple AI styling.
- Dense icon walls.
- Builder-brochure aesthetics.
- Aggressive sales banners.
- Auto-playing carousels.
- Excessive cards and shadows.
- Tiny text.
- Fake luxury using gold everywhere.

## Locked colour system

Use a white-dominant light theme.

- Canvas and primary background: `#FFFFFF`
- Secondary background: `#F7F8FA`
- Primary text / Ink: `#172033`
- Secondary text: `#667085`
- Primary Cobalt: `#175CD3`
- Cobalt hover/pressed: `#124AA8`
- Soft Cobalt background: `#DDEBFF`
- Warm Orange accent: `#F97316`
- Soft Orange background: `#FFF1E8`
- WhatsApp / success green: `#168B67`
- Soft green background: `#E8F8F1`
- Warning: `#D97706`
- Error: `#D92D20`
- Borders and dividers: `#E4E7EC`
- Disabled surface: `#F2F4F7`

White must remain the dominant visual surface.

Use Cobalt for primary actions, active navigation, links, selection and focused
controls. Use Orange selectively for price emphasis, small attention moments,
new-launch labels and warm brand details. Never place competing Cobalt and
Orange primary buttons in the same section. Green is semantic and reserved for
WhatsApp, verified status and success feedback.

All text and interactive colour combinations must meet WCAG AA contrast.

## Typography

- Display and property storytelling: **Fraunces**, weights 400 and 500.
- Interface, forms and body text: **Manrope**, weights 400 and 500.
- Prices, analytics and tabular figures: **Space Grotesk**, weights 400 and 500.

Use Fraunces for major marketing headlines, property names, prices and
editorial section headings. Use Manrope for navigation, buttons, forms, body
copy and dashboard labels. Use Space Grotesk for EMI figures, view counts,
prices inside compact components and analytics.

Use a clear responsive hierarchy:

- Marketing hero: 72–88 px desktop, 44–52 px mobile.
- Page title: 40–48 px desktop, 32–36 px mobile.
- Section title: 30–40 px desktop, 26–30 px mobile.
- Card/title: 18–24 px.
- Body: 15–17 px.
- Supporting text: never smaller than 12 px.

## Layout and component rules

- Use an 8 px spacing system.
- Desktop content width: approximately 1200–1280 px.
- Desktop dashboard uses a 240 px left sidebar.
- Mobile dashboard uses a persistent bottom navigation with 4–5 primary items.
- Public microsite uses an unobtrusive top bar and sticky mobile contact area.
- Minimum interactive target: 44 × 44 px.
- Border radius: 8 px controls, 12 px cards, 16–20 px major media.
- Use subtle 1 px borders before shadows.
- Shadows should be rare, soft and low contrast.
- Prefer whitespace and dividers over placing every section inside a card.
- Use real property photography and realistic floor-plan/map placeholders.
- Use line icons with consistent 1.5–2 px strokes.
- Provide keyboard focus, hover, pressed, selected and disabled states.
- Use bottom sheets instead of centered modals for most mobile actions.
- Respect iOS and Android safe areas on mobile.

## Realistic demo data

Primary property:

- Verdant Heights
- Kharadi, Pune
- Aurum Developers
- New launch
- RERA verified
- 3 and 4 BHK
- Carpet area 1,246–1,890 sq. ft.
- Starting price ₹1.48 Cr
- Possession December 2028
- 5-acre development with 3 towers

Broker:

- Abhi Mehta
- MarketiX Realty
- RERA verified channel partner
- Pune
- Phone ending 3210

Additional properties:

- The Canopy — Baner, Pune — from ₹2.10 Cr
- Riverstone — Koregaon Park, Pune — from ₹3.25 Cr
- Skyline One — Wakad, Pune — from ₹94 L

Use Indian rupee formatting and Indian number grouping.

## Generate these screens

### A. Design-system foundation

#### 01. Brand and component library

Create one desktop design-system frame containing:

- Logo/wordmark treatment.
- Complete colour tokens and semantic roles.
- Typography scale.
- Buttons: primary, secondary, outline, ghost, WhatsApp and destructive.
- Inputs, selects, text areas, search, range sliders and upload controls.
- Tabs, chips, badges, tooltips, pagination and breadcrumbs.
- Cards, property cards, metric tiles and document rows.
- Desktop sidebar, desktop header and mobile bottom navigation.
- Toasts, banners, dialogs, mobile bottom sheets and confirmation states.
- Skeleton loaders, empty states and error states.
- Photo gallery, map, floor-plan and video placeholders.
- Chart styles using Cobalt as the primary series.

### B. Marketing website

#### 02. Marketing landing page

Desktop and mobile:

- Navigation with logo, Product, How it works, Pricing, Log in and a primary
  “Create your first page” action.
- Hero: “Every property. One beautiful link.”
- Supporting copy explaining the WhatsApp attachment problem.
- Primary CTA and “View live example” secondary action.
- Large product preview showing a property microsite.
- Before/after section comparing many WhatsApp attachments with one Nestory
  link.
- Three-step process: upload, personalise, share.
- Feature section highlighting premium gallery, live documents, EMI calculator,
  QR code, analytics and personalised links.
- CP-specific section for multi-project portfolios and attribution.
- Realistic testimonial/social proof area without invented big-brand logos.
- Pricing preview.
- FAQ.
- Final CTA and footer.

Mobile must prioritise the hero, live-example CTA and product preview without
shrinking desktop content.

#### 03. Features page

Desktop and mobile:

- Clear feature categories: present, share, track, organise and convert.
- Demonstrate gallery, floor plans, document versioning, QR sharing, analytics,
  personal links, multilingual content and privacy controls.
- Use product screenshots rather than decorative illustrations.
- End with CTA.

#### 04. Pricing page

Desktop and mobile:

- Starter: ₹499/month, 5 active properties.
- Professional: ₹1,499/month, unlimited properties.
- Optional pay-per-property offering.
- Monthly/annual switch.
- Clear comparison table.
- FAQ about limits, cancellation, custom domains and storage.
- Primary plan selection actions.

### C. Authentication and onboarding

#### 05. Log in

- Email or mobile number.
- Password and OTP options.
- Forgot password.
- Continue with Google as secondary.
- Link to sign up.
- Calm property-image panel on desktop; compact brand header on mobile.
- Validation, loading and incorrect-credential states.

#### 06. Sign up

- Name, phone/email, password and consent.
- Role selection: Broker or Channel Partner.
- Clear trust and privacy copy.
- OTP verification state.
- Success state leading into onboarding.

#### 07. Forgot password and reset

- Request reset.
- Code verification.
- Set new password.
- Success confirmation.

#### 08. Onboarding

Create a four-step desktop and mobile flow:

1. Choose Broker or Channel Partner.
2. Business profile: company, RERA number, city and service areas.
3. Brand profile: logo, profile image, contact details and WhatsApp number.
4. Create first property or explore sample project.

Include step progress, back, save and continue.

### D. Broker dashboard and account

#### 09. Dashboard overview

Desktop:

- Left sidebar: Overview, Properties, Collections, Leads, Analytics and Settings.
- Header with date, search, notifications, help and user menu.
- Welcome message.
- Metrics: total views, active properties, WhatsApp clicks and leads.
- Seven-day view chart.
- Recent properties.
- Recent prospect activity.
- Quick actions: New property, Share project and Create client link.

Mobile:

- Compact header and bottom navigation.
- Two-column metrics.
- Scrollable recent projects and activity.
- Floating “Add property” action if it does not obstruct content.

#### 10. My properties — grid view

- Search.
- Filters: status, developer, location and property type.
- Sort: recently updated, most viewed and alphabetical.
- Property cards with image, status, location, configuration, price, views,
  update date and overflow actions.
- Grid/list toggle on desktop.
- Add property card.
- Empty state, no-search-results state and loading skeleton.
- Mobile filter bottom sheet.

#### 11. My properties — list/table view

- Desktop data table for high-volume CPs.
- Columns: property, developer, location, status, last updated, views, leads and
  actions.
- Bulk publish/unpublish/archive.
- Mobile uses compact list rows, never a squeezed desktop table.

#### 12. Property detail in dashboard

- Property header with image, status, public URL, edit, preview and share.
- Overview metrics.
- Recent client-link performance.
- Latest document versions.
- Leads and buyer activity.
- Quick edit areas.
- Version history.

#### 13. Create property — step 1: basics

- Project name, developer, property type, location and status.
- Map/address search placeholder.
- Save draft and exit.

#### 14. Create property — step 2: configurations and pricing

- Add multiple configurations.
- BHK, carpet area, base price, all-inclusive price and availability.
- Possession date.
- Repeatable unit-type rows.
- Mobile-friendly progressive disclosure.

#### 15. Create property — step 3: media and documents

- Drag/drop and mobile file picker.
- Images, videos, floor plans, brochure, price list and RERA documents.
- Upload progress, retry, reorder, cover-image selection and file-type labels.
- Document version/update date.

#### 16. Create property — step 4: details and amenities

- Project summary.
- Highlights.
- Amenities grouped by lifestyle.
- Nearby landmarks with travel time.
- RERA details.

#### 17. Create property — preview and publish

- Desktop preview beside completeness checklist.
- Mobile full-screen preview.
- Missing-information warnings.
- Slug selection.
- Publish confirmation.
- Successful publish state with copy link, WhatsApp and QR actions.

#### 18. Edit property

- Persistent save status.
- Same sections as creation but organised as tabs on desktop and an accordion or
  section list on mobile.
- Unsaved-change warning.

#### 19. Collections and developer folders

- Group properties by developer, location or custom collection.
- Create/edit collection.
- Add/remove properties.
- Generate one shareable collection link.
- Collection performance metrics.

#### 20. Personalised share link

- Select property.
- Optional client name.
- Optional phone number.
- Select configurations to highlight.
- Toggle visible price and downloadable documents.
- Preview prefilled WhatsApp message.
- Generate link.
- Copy, WhatsApp and QR actions.
- Link expiry and privacy controls.

#### 21. Share centre and QR

- Public URL preview card.
- WhatsApp preview image/title/description.
- Downloadable QR code.
- Print sizes for desk card, brochure and poster.
- Recently created client links.

#### 22. Leads

- Lead list with name, property, source, interest, latest activity and status.
- Pipeline statuses: New, Contacted, Site Visit, Negotiating and Closed.
- Filter and search.
- Lead detail drawer on desktop and full page on mobile.
- Notes, reminder, call, WhatsApp and activity timeline.

#### 23. Analytics overview

- Date range.
- Views, unique visitors, repeat visitors, WhatsApp clicks, calls, document
  downloads, QR scans and enquiries.
- Trend chart.
- Top properties.
- Traffic sources.
- Device split.
- Geographic summary.
- Clear empty state for new accounts.

#### 24. Property analytics

- Performance for one property.
- Client-link table with first opened, last opened, repeat views and actions.
- Engagement funnel.
- Timeline of important prospect actions.
- Export lead-ownership report action.

#### 25. Notifications

- High-intent return visits.
- Document downloads.
- New enquiries.
- Price sheet needs updating.
- Upload complete/failed.
- Read/unread controls.

#### 26. Account profile

- Personal details.
- Broker photo.
- Phone/email.
- Password and authentication.
- Language and notification preferences.
- Active sessions.

#### 27. Business and public identity

- Company/brand name.
- Logo.
- RERA number and verification.
- WhatsApp and calling number.
- Service area.
- Public profile preview.
- Social and legal details.

#### 28. Team management

- Team members and roles.
- Invite member.
- Owner, Admin and Agent permissions.
- Pending invites.
- Activity and remove-member confirmation.

#### 29. Billing and plan

- Current plan and usage.
- Active properties and storage.
- Upgrade/downgrade.
- Payment method.
- Invoice history.
- Cancellation confirmation.

#### 30. General settings

- Default property visibility.
- Download permissions.
- Client-link defaults.
- Language.
- Custom domain placeholder.
- Data export and delete-account area.

### E. Public buyer-facing property microsite

The public microsite must be the highest-quality part of the product. Make it
feel like a premium Airbnb listing, not a dashboard.

#### 31. Public property microsite — main page

Desktop:

- Minimal top bar with Nestory/broker branding, Share and Save.
- Immersive five-image editorial gallery.
- Project status, RERA verified status, project name, location and developer.
- Key facts: price, BHK, carpet area and possession.
- Sticky broker contact card on the right.
- Project story.
- Highlights.
- Configuration selector.
- Floor-plan preview.
- Current pricing.
- EMI calculator preview.
- Amenities.
- Location/map and landmark travel times.
- Video/360 tour.
- Documents.
- Similar properties.
- Broker trust profile.
- Legal disclaimer and update timestamp.

Mobile:

- Full-width hero photo with gallery count.
- Compact project summary.
- Horizontally scrollable key facts only where appropriate.
- Sections stacked in a natural buyer journey.
- Persistent bottom contact bar with price and WhatsApp.
- Bottom bar respects safe areas and never covers the last content.

No forced enquiry popup before the buyer can explore the property.

#### 32. Full-screen gallery

- Photo categories: exterior, living, bedroom, amenities and views.
- Desktop mosaic/lightbox.
- Mobile swipe gallery.
- Image count, close and share.
- Captions only when useful.

#### 33. Floor plans and configurations

- Tabs for 3 BHK and 4 BHK.
- Carpet area and price.
- Large zoomable floor plan.
- Orientation and dimensions.
- Pinch-to-zoom mobile state.
- “Ask about this configuration” action.

#### 34. Pricing and EMI calculator

- Property price.
- Adjustable down payment.
- Adjustable interest rate.
- Adjustable loan tenure.
- Estimated monthly EMI.
- Loan amount, total interest and total repayment.
- Indicative-only disclaimer.
- Cobalt sliders and values.
- Orange used only for selected price emphasis.
- “Discuss financing” WhatsApp action.

#### 35. Location and neighbourhood

- Map.
- Project pin.
- Nearby landmarks grouped by work, education, healthcare and lifestyle.
- Travel time and distance.
- Mobile map expansion.
- Get directions action.

#### 36. Documents and brochure

- Brochure.
- Floor plan pack.
- Current price sheet.
- RERA documents.
- File size and last-updated date.
- View and download actions.
- Clearly show when a price sheet was updated.

#### 37. Share and QR bottom sheet/modal

- Copy public link.
- WhatsApp.
- Native share.
- Download QR.
- QR code preview.
- Optional client-name personalisation when opened by the broker.

#### 38. Enquiry and site-visit flow

- Request callback.
- Book site visit.
- Name, phone, preferred date and time.
- Consent copy.
- Mobile bottom-sheet form.
- Confirmation with broker contact and Add to Calendar placeholder.

#### 39. Compare and shortlist

- Compare 2–3 selected properties or configurations.
- Price, carpet area, possession, location, amenities and monthly EMI.
- Buyer can use it without creating an account.
- Share comparison action.
- Mobile presents one comparison dimension at a time without horizontal
  overflow.

### F. System and edge states

#### 40. Empty, loading, offline and error states

Create a grouped desktop/mobile screen set for:

- No properties yet.
- No leads yet.
- No analytics yet.
- Upload in progress.
- Upload failed with retry.
- Offline with locally cached recent properties.
- Public property unavailable.
- Link expired.
- Property unpublished.
- 404 page.
- General error with retry.

## Prototype connections

Connect at least these flows:

1. Marketing page → Sign up → Onboarding → Dashboard.
2. Dashboard → New property → Four creation steps → Preview → Publish success.
3. My properties → Property detail → Edit → Save.
4. Property detail → Create personalised link → Share/QR.
5. Dashboard property card → Public microsite preview.
6. Public microsite → Gallery → Floor plan → EMI calculator → WhatsApp.
7. Public microsite → Book site visit → Confirmation.
8. Analytics overview → Property analytics → Client-link activity.

## Responsive behaviour

Do not simply shrink desktop frames.

For mobile:

- Reorder content by importance.
- Replace sidebar with bottom navigation.
- Replace wide tables with list rows.
- Replace centered dialogs with bottom sheets.
- Use full-width media.
- Keep forms single-column.
- Use sticky actions sparingly.
- Preserve 44 px touch targets.
- Avoid horizontal page scrolling.
- Ensure EMI sliders, QR actions, gallery controls and floor plans are easy to
  use with one thumb.

For desktop:

- Use generous whitespace.
- Keep readable line lengths.
- Use sticky side information only when helpful.
- Take advantage of side-by-side preview/edit and analytics layouts.

## Final consistency check

Before finishing:

- Confirm all 40 screen groups exist in desktop and mobile versions.
- Confirm Cobalt is the only primary action colour.
- Confirm Orange is used selectively.
- Confirm WhatsApp green is semantic.
- Confirm Fraunces, Manrope and Space Grotesk are used consistently.
- Confirm the public microsite is visually more editorial and photography-led
  than the dashboard.
- Confirm every mobile screen is designed intentionally rather than scaled down.
- Confirm navigation labels and component styling are consistent across the
  whole project.
- Confirm no essential buyer action requires an account or app installation.

---

After generating the first pass, preserve this design system and refine one
screen group at a time. Do not regenerate the whole project in a different
visual style.
