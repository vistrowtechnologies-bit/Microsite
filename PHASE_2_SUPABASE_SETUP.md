# Phase 2: Supabase activation

The application already contains the browser auth client, email OTP flow, broker
onboarding transaction, organization membership model, and tenant Row Level
Security policies. Until the two public environment values below are set, the
deployed site intentionally remains in preview mode.

## 1. Create and configure the project

1. Create a Supabase project for Nestory.
2. In Authentication → URL Configuration, add the production microsite URL and
   local development URL as allowed redirect URLs.
3. Keep email OTP enabled. Customize the email template with Prophunt LLP
   wording before inviting production users.
4. Run `supabase/migrations/202607280001_phase_2_identity.sql` in the Supabase
   SQL editor.

## 2. Connect the application

Add these values locally and to the production site environment:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Only the public anon key belongs in the browser environment. Never expose the
Supabase service-role key.

## 3. Acceptance checks

- A new user receives a six-digit email OTP and creates one organization.
- A returning organization member signs in directly to the dashboard.
- The onboarding transaction creates the profile, organization, owner
  membership, and public broker profile together.
- A signed-in user cannot read another organization's membership or broker
  profile.
- A user cannot complete onboarding twice.
