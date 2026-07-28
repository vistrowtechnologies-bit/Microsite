import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

export const runtime = "edge";

const Extraction = z.object({
  facts: z.array(z.object({
    key: z.string(),
    label: z.string(),
    category: z.enum([
      "Project basics",
      "RERA & possession",
      "Configurations",
      "Pricing",
      "Highlights",
      "Amenities",
      "Floor plans",
      "Gallery",
      "Location",
      "Documents",
    ]),
    value: z.string(),
    confidence: z.number().min(0).max(1),
    is_conflict: z.boolean(),
    conflicting_values: z.array(z.string()),
    evidence: z.array(z.object({
      source_filename: z.string(),
      locator: z.string(),
      quote: z.string(),
    })),
  })),
  warnings: z.array(z.string()),
});

const EXTRACTION_PROMPT = `Extract buyer-facing facts from an Indian real-estate developer package.

Rules:
- Use only the supplied sources. Never invent, estimate, or complete a missing fact.
- Return one fact per stable key. Use project_name, developer_name, locality, city,
  rera_number, possession, starting_price, configurations, carpet_areas,
  project_size, towers, storeys, amenities, highlights, nearby_landmarks,
  brochure_documents, and floor_plan_notes where applicable.
- Preserve Indian price notation such as ₹1.48 Cr and area units such as sq. ft.
- Evidence must name the exact source filename and the best available page, sheet,
  row, section, or image locator. Include a short supporting quote.
- When sources disagree, set is_conflict true, list every conflicting value, lower
  confidence, and do not choose a winner.
- If evidence is missing or ambiguous, omit the fact instead of guessing.
- Assign categories that match the supplied enum. Keep labels concise and readable.`;

type SourceRow = {
  id: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  storage_path: string | null;
  text_content: string | null;
  kind: "file" | "pasted_text";
};

async function privacySafeIdentifier(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const workerSecret = process.env.IMPORT_WORKER_SECRET;
  const model = process.env.OPENAI_EXTRACTION_MODEL || "gpt-5.6";

  if (!supabaseUrl || !serviceRoleKey || !openaiApiKey) {
    return NextResponse.json({ error: "Extraction runtime is not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null) as { import_id?: string } | null;
  if (!body?.import_id) {
    return NextResponse.json({ error: "import_id is required." }, { status: 400 });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: job, error: jobError } = await admin
    .from("property_import_jobs")
    .select("id,organization_id,property_id,status")
    .eq("id", body.import_id)
    .single();

  if (jobError || !job) {
    return NextResponse.json({ error: "Import job not found." }, { status: 404 });
  }

  const authorization = request.headers.get("authorization");
  const suppliedWorkerSecret = request.headers.get("x-worker-secret");
  const trustedWorker = Boolean(workerSecret && suppliedWorkerSecret === workerSecret);
  let actorId = `organization:${job.organization_id}`;

  if (!trustedWorker) {
    const accessToken = authorization?.startsWith("Bearer ") ? authorization.slice(7) : "";
    if (!accessToken) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

    const { data: userData, error: userError } = await admin.auth.getUser(accessToken);
    if (userError || !userData.user) {
      return NextResponse.json({ error: "Invalid session." }, { status: 401 });
    }

    const { data: membership } = await admin
      .from("organization_members")
      .select("organization_id")
      .eq("organization_id", job.organization_id)
      .eq("user_id", userData.user.id)
      .maybeSingle();

    if (!membership) return NextResponse.json({ error: "Organization access denied." }, { status: 403 });
    actorId = `user:${userData.user.id}`;
  }

  if (job.status === "needs_review" || job.status === "completed") {
    return NextResponse.json({ status: job.status, already_processed: true });
  }
  if (job.status === "processing") {
    return NextResponse.json({ status: "processing", already_started: true }, { status: 202 });
  }
  if (job.status !== "queued" && job.status !== "failed") {
    return NextResponse.json({ error: `Import cannot start from ${job.status}.` }, { status: 409 });
  }

  const { data: claimedJob, error: claimError } = await admin
    .from("property_import_jobs")
    .update({ status: "processing", progress: 20, started_at: new Date().toISOString(), error_message: null })
    .eq("id", job.id)
    .in("status", ["queued", "failed"])
    .select("id")
    .maybeSingle();

  if (claimError) {
    return NextResponse.json({ error: claimError.message }, { status: 500 });
  }
  if (!claimedJob) {
    return NextResponse.json({ status: "processing", already_started: true }, { status: 202 });
  }

  try {
    const { data: sourceRows, error: sourceError } = await admin
      .from("property_sources")
      .select("id,filename,mime_type,size_bytes,storage_path,text_content,kind")
      .eq("import_job_id", job.id)
      .eq("status", "ready")
      .order("created_at");

    if (sourceError) throw sourceError;
    const sources = (sourceRows ?? []) as SourceRow[];
    const warnings: string[] = [];
    const content: Array<Record<string, unknown>> = [{
      type: "input_text",
      text: "Review every supplied source together and return the structured property facts.",
    }];

    let documentBytes = 0;
    let imageCount = 0;
    const maxDocumentBytes = 48_000_000;

    for (const source of sources) {
      if (source.kind === "pasted_text" && source.text_content) {
        content.push({
          type: "input_text",
          text: `SOURCE: ${source.filename}\n${source.text_content}`,
        });
        continue;
      }
      if (!source.storage_path) continue;

      const isImage = source.mime_type.startsWith("image/");
      const isZip = source.mime_type === "application/zip";
      if (isZip) {
        warnings.push(`${source.filename} is stored safely but ZIP extraction requires a separate unpacking step.`);
        continue;
      }
      if (!isImage && (source.size_bytes >= 50_000_000 || documentBytes + source.size_bytes > maxDocumentBytes)) {
        warnings.push(`${source.filename} exceeded the current model request batch and still needs extraction.`);
        continue;
      }
      if (isImage && imageCount >= 8) {
        warnings.push(`${source.filename} was stored but deferred because this extraction run already includes 8 images.`);
        continue;
      }

      const { data: signed, error: signedError } = await admin.storage
        .from("property-source-files")
        .createSignedUrl(source.storage_path, 600);
      if (signedError || !signed?.signedUrl) {
        warnings.push(`${source.filename} could not be opened for this extraction run.`);
        continue;
      }

      if (isImage) {
        imageCount += 1;
        content.push({
          type: "input_text",
          text: `IMAGE SOURCE: ${source.filename}`,
        });
        content.push({
          type: "input_image",
          image_url: signed.signedUrl,
          detail: "auto",
        });
      } else {
        documentBytes += source.size_bytes;
        content.push({
          type: "input_file",
          file_url: signed.signedUrl,
          filename: source.filename,
          ...(source.mime_type === "application/pdf" ? { detail: "high" } : {}),
        });
      }
    }

    if (content.length === 1) throw new Error("No supported source could be sent for extraction.");

    await admin
      .from("property_import_jobs")
      .update({ progress: 55, updated_at: new Date().toISOString() })
      .eq("id", job.id);

    const openai = new OpenAI({ apiKey: openaiApiKey });
    const response = await openai.responses.parse({
      model,
      store: false,
      safety_identifier: await privacySafeIdentifier(actorId),
      reasoning: { effort: "low" },
      input: [
        { role: "system", content: EXTRACTION_PROMPT },
        { role: "user", content: content as never },
      ],
      text: {
        format: zodTextFormat(Extraction, "property_extraction"),
      },
    });

    if (!response.output_parsed) throw new Error("The model did not return a usable extraction.");
    const combinedWarnings = [...warnings, ...response.output_parsed.warnings];
    const seenKeys = new Set<string>();
    const normalizedFacts = response.output_parsed.facts.filter((fact) => {
      if (!fact.value.trim() || seenKeys.has(fact.key)) return false;
      seenKeys.add(fact.key);
      return true;
    });
    if (!normalizedFacts.length) throw new Error("No source-backed property facts were found.");

    const { error: finalizeError } = await admin.rpc("finalize_property_extraction", {
      p_import_id: job.id,
      p_model: model,
      p_response_id: response.id,
      p_facts: normalizedFacts,
      p_warnings: combinedWarnings,
    });
    if (finalizeError) throw finalizeError;

    return NextResponse.json({
      status: "needs_review",
      fact_count: normalizedFacts.length,
      warning_count: combinedWarnings.length,
    });
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : "Extraction failed.";
    await admin
      .from("property_import_jobs")
      .update({ status: "failed", error_message: message, updated_at: new Date().toISOString() })
      .eq("id", job.id);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
