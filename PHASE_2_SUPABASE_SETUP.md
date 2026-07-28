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
4. Run every file in `supabase/migrations` in filename order in the Supabase
   SQL editor. The second migration adds the property library, import queue,
   private source-file bucket, and tenant storage policies.

## 2. Connect the application

Add these values locally and to the production site environment:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY
OPENAI_API_KEY=YOUR_SERVER_ONLY_OPENAI_KEY
OPENAI_EXTRACTION_MODEL=gpt-5.6
IMPORT_WORKER_SECRET=GENERATE_A_LONG_RANDOM_SECRET
```

Only the first two `NEXT_PUBLIC_` values belong in the browser environment.
The Supabase service-role key, OpenAI key, and worker secret must be stored as
server-side production secrets and must never be exposed to browser code.

## 3. Acceptance checks

- A new user receives a six-digit email OTP and creates one organization.
- A returning organization member signs in directly to the dashboard.
- The onboarding transaction creates the profile, organization, owner
  membership, and public broker profile together.
- A signed-in user cannot read another organization's membership or broker
  profile.
- A user cannot complete onboarding twice.
- A mixed project package creates one draft property and one import job.
- Uploaded source files are stored privately under the member's organization.
- A member cannot list, read, upload, or delete another organization's sources.
- A queued import can be claimed only once by the extraction endpoint.
- Extracted facts persist with confidence, conflicts, evidence, and review state.
- Publishing remains disabled until the broker confirms or rejects every fact;
  dynamic property-page publishing is implemented in the following phase.

The extraction endpoint sends supported private sources through short-lived
signed URLs. It uses the OpenAI Responses API with structured output and stores
the resulting facts for human review. ZIP archives and documents beyond the
model's per-request file limit remain stored and are surfaced as warnings for a
later batching/unpacking pass.
