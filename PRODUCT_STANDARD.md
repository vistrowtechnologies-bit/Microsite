# Nestory Product Standard

## Product promise

Nestory turns every property into a premium, calm, Airbnb-style buying
experience. The public page is not a builder brochure and not a property portal.
It is a guided presentation prepared by a trusted broker or channel partner.

## One product, three surfaces

1. **Public web microsite**
   - Opens instantly from WhatsApp in any mobile or desktop browser.
   - Requires no buyer login or app installation.
   - Has a stable, shareable URL and rich WhatsApp/social preview.

2. **Broker web dashboard**
   - Responsive Next.js application for uploading, editing, organising and
     analysing projects from a browser.
   - Optimised for desktop administration while remaining fully usable on a
     phone.

3. **Native broker app**
   - Expo React Native application for Android and iOS.
   - Android deliverables: installable APK for testing and AAB for Play Store.
   - iOS deliverables: development/TestFlight build and App Store IPA.
   - Uses the same Supabase account, properties, assets, links and analytics as
     the web dashboard.

The buyer-facing microsite remains a web link. Buyers should never be forced to
install the Nestory app.

## Public microsite experience

### Above the fold

- Edge-to-edge editorial photo gallery with full-screen viewing.
- Project name, location, developer and RERA verification.
- Price range, configuration, carpet area and possession date.
- Persistent WhatsApp and call actions that never obstruct the content.
- Broker identity and trust information without turning the page into an ad.

### Guided buyer journey

1. Overview and key facts.
2. Project story and highlights.
3. Configuration selector for BHK/unit types.
4. Interactive floor plans with dimensions and orientation.
5. Price breakdown with current update date and optional EMI estimate.
6. Amenities grouped by lifestyle rather than an icon dump.
7. Location map, landmark travel times and neighbourhood context.
8. Video walkthrough and optional 360-degree tour.
9. Downloadable brochure, price sheet and RERA documents.
10. Similar or shortlisted projects from the same broker.
11. Clear enquiry, callback and site-visit actions.

## Differentiators

These features should make Nestory meaningfully stronger than a generic
microsite or listing generator:

- **Per-client smart links:** optional client name, broker-selected units and a
  prefilled WhatsApp message without duplicating the property.
- **Attribution timeline:** first open, repeat visits, document downloads,
  WhatsApp taps, calls and site-visit intent attached to the shared link.
- **Lead ownership proof:** timestamped link creation and engagement history
  exportable as a concise report.
- **Live document versioning:** update a price sheet once; every previously
  shared link immediately shows the latest version and its update date.
- **Buyer shortlist:** compare selected configurations or projects without an
  account.
- **Guided presentation mode:** a CP can walk through the microsite with a
  client during a call or meeting.
- **Privacy controls:** optionally hide the exact unit, owner details, price or
  downloads until the buyer requests access.
- **Offline broker access:** native apps cache recent projects and queue shares
  or uploads when connectivity is weak.
- **Share preview control:** broker can preview and choose the WhatsApp title,
  image and short description before sharing.
- **Regional presentation:** English, Hindi and Marathi content can be switched
  per link while preserving one source property.
- **Mobile document intelligence:** photograph or upload a brochure/price list,
  then review suggested facts and assets before publishing.
- **Intent alerts:** notify the broker when a previously quiet prospect returns,
  views repeatedly or downloads a price sheet.

## Airbnb-style design rules

- Photography leads; interface chrome recedes.
- Generous whitespace, editorial hierarchy and calm transitions.
- One primary action per section.
- Important facts are scannable without reading paragraphs.
- No carousels that auto-advance, flashing offer banners or dense icon walls.
- No forced pop-up lead form before the buyer can view the property.
- Contact actions remain available but never feel aggressive.
- Every interaction works with touch, keyboard and screen readers.
- Target fast first display on ordinary Indian mobile networks.

## Shared architecture

- Next.js + TypeScript for marketing, dashboard and public microsites.
- Expo React Native + TypeScript for genuine Android and iOS applications.
- Supabase Postgres, Auth and Storage as the single backend.
- Shared types, validation and property CRUD logic in monorepo packages.
- Universal/deep links open the native app for signed-in brokers and the public
  microsite for buyers.
- Image transformation, responsive loading and background upload are required.
- Row Level Security isolates every tenant; only published microsite data is
  publicly readable.

## Build sequence

1. Lock colour, typography and the public microsite component system.
2. Prototype and test the complete buyer journey on mobile web.
3. Define database, storage and RLS around the approved experience.
4. Build broker web workflows and real analytics.
5. Build the Expo app against the same backend.
6. Produce Android APK/AAB and iOS TestFlight/App Store builds.

## Acceptance standard

The experience is ready for backend wiring only when:

- The public microsite works from 320 px phones through large desktops.
- A buyer can understand the property and contact the broker without guidance.
- A CP can share a personalised link in under 20 seconds.
- Updating a property does not require generating a new link.
- All essential web workflows have a defined native-app equivalent.
- Android, iOS and browser clients use one account and one data source.
