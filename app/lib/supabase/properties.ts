import { getSupabaseBrowserClient } from "./client";

export type PropertySummary = {
  id: string;
  title: string;
  developer_name: string | null;
  locality: string | null;
  city: string | null;
  price_label: string | null;
  configuration_label: string | null;
  status: "importing" | "draft" | "in_review" | "published" | "archived";
  updated_at: string;
};

export type ImportStatus = {
  id: string;
  status: "uploading" | "queued" | "processing" | "needs_review" | "completed" | "failed";
  progress: number;
  error_message: string | null;
};

export type FactEvidence = {
  source_filename: string;
  locator: string;
  quote: string;
};

export type PropertyFact = {
  id: string;
  category: string;
  fact_key: string;
  label: string;
  value_json: unknown;
  confidence: number;
  review_status: "extracted" | "needs_review" | "confirmed" | "rejected";
  is_conflict: boolean;
  conflicting_values: string[];
  evidence: FactEvidence[];
};

const SOURCE_BUCKET = "property-source-files";

function safeFilename(filename: string) {
  return filename
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

async function getCurrentOrganizationId() {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("organization_members")
    .select("organization_id")
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data?.organization_id) throw new Error("Complete workspace onboarding before adding a property.");
  return data.organization_id as string;
}

export async function listProperties() {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("properties")
    .select("id,title,developer_name,locality,city,price_label,configuration_label,status,updated_at")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as PropertySummary[];
}

export async function createPropertyImport(input: {
  files: File[];
  sourceNotes: string;
}) {
  const supabase = getSupabaseBrowserClient();
  const organizationId = await getCurrentOrganizationId();
  const { data: importJob, error: importError } = await supabase
    .rpc("create_property_import", {
      p_organization_id: organizationId,
      p_source_notes: input.sourceNotes.trim() || null,
      p_source_count: input.files.length + (input.sourceNotes.trim() ? 1 : 0),
    })
    .single();

  if (importError) throw importError;
  if (!importJob) throw new Error("The property import could not be created.");

  const uploadedPaths: string[] = [];
  try {
    for (const file of input.files) {
      const storagePath = `${organizationId}/${importJob.property_id}/${crypto.randomUUID()}-${safeFilename(file.name)}`;
      const { error: uploadError } = await supabase.storage
        .from(SOURCE_BUCKET)
        .upload(storagePath, file, {
          cacheControl: "3600",
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });
      if (uploadError) throw uploadError;
      uploadedPaths.push(storagePath);

      const { error: sourceError } = await supabase.from("property_sources").insert({
        organization_id: organizationId,
        property_id: importJob.property_id,
        import_job_id: importJob.import_id,
        kind: "file",
        storage_path: storagePath,
        filename: file.name,
        mime_type: file.type || "application/octet-stream",
        size_bytes: file.size,
        status: "ready",
      });
      if (sourceError) throw sourceError;
    }

    if (input.sourceNotes.trim()) {
      const { error: noteError } = await supabase.from("property_sources").insert({
        organization_id: organizationId,
        property_id: importJob.property_id,
        import_job_id: importJob.import_id,
        kind: "pasted_text",
        text_content: input.sourceNotes.trim(),
        filename: "Developer notes",
        mime_type: "text/plain",
        size_bytes: new Blob([input.sourceNotes]).size,
        status: "ready",
      });
      if (noteError) throw noteError;
    }

    const { error: queueError } = await supabase
      .from("property_import_jobs")
      .update({ status: "queued", progress: 10, queued_at: new Date().toISOString() })
      .eq("id", importJob.import_id);
    if (queueError) throw queueError;

    return { propertyId: importJob.property_id as string, importId: importJob.import_id as string };
  } catch (reason) {
    if (uploadedPaths.length) {
      await supabase.storage.from(SOURCE_BUCKET).remove(uploadedPaths);
    }
    await supabase
      .from("property_import_jobs")
      .update({
        status: "failed",
        error_message: reason instanceof Error ? reason.message : "Upload failed",
      })
      .eq("id", importJob.import_id);
    throw reason;
  }
}

export async function getPropertyImportStatus(importId: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("property_import_jobs")
    .select("id,status,progress,error_message")
    .eq("id", importId)
    .single();

  if (error) throw error;
  return data as ImportStatus;
}

export async function startPropertyExtraction(importId: string) {
  const supabase = getSupabaseBrowserClient();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) throw new Error("Sign in again to start extraction.");

  const response = await fetch("/api/imports/process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ import_id: importId }),
  });

  const result = await response.json().catch(() => ({})) as { error?: string };
  if (!response.ok && response.status !== 202) {
    throw new Error(result.error || "Extraction could not be started.");
  }
}

export async function listPropertyFacts(propertyId: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("property_facts")
    .select("id,category,fact_key,label,value_json,confidence,review_status,is_conflict,conflicting_values,evidence")
    .eq("property_id", propertyId)
    .order("category")
    .order("label");

  if (error) throw error;
  return (data ?? []) as PropertyFact[];
}

async function setPropertyFactReview(factId: string, value: string, reviewStatus: "confirmed" | "rejected") {
  const supabase = getSupabaseBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!userData.user) throw new Error("Sign in again to review this fact.");

  const { error } = await supabase
    .from("property_facts")
    .update({
      value_json: value,
      review_status: reviewStatus,
      reviewed_by: userData.user.id,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", factId);

  if (error) throw error;
}

export async function confirmPropertyFact(factId: string, value: string) {
  return setPropertyFactReview(factId, value, "confirmed");
}

export async function rejectPropertyFact(factId: string, value: string) {
  return setPropertyFactReview(factId, value, "rejected");
}
