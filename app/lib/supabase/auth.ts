import { getSupabaseBrowserClient } from "./client";

export async function sendEmailOtp(email: string, shouldCreateUser: boolean) {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser },
  });
  if (error) throw error;
}

export async function verifyEmailOtp(email: string, token: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
  if (error) throw error;
  return data.session;
}

export async function hasOrganizationMembership() {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("organization_members")
    .select("organization_id")
    .limit(1);
  if (error) throw error;
  return Boolean(data?.length);
}

export async function completeBrokerOnboarding(input: {
  organizationName: string;
  role: string;
  fullName: string;
  phone: string;
  city: string;
  reraNumber: string;
  defaultLanguage: string;
}) {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.rpc("complete_broker_onboarding", {
    p_organization_name: input.organizationName,
    p_role: input.role,
    p_full_name: input.fullName,
    p_phone: input.phone,
    p_city: input.city,
    p_rera_number: input.reraNumber,
    p_default_language: input.defaultLanguage,
  });
  if (error) throw error;
}
