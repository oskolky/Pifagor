import { apiFetch } from "./client";
import { tokenStore } from "./token";
import type { ApiUser, AuthToken, InviteCode, UserRole } from "./types";

export function login(email: string, password: string) {
  return apiFetch<AuthToken>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register(payload: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  invite_code: string;
  role: UserRole;
}) {
  return apiFetch<ApiUser>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      middle_name: "",
      phone: "+375000000000",
    }),
  });
}

export function fetchInviteCodes() {
  return apiFetch<InviteCode[]>("/api/v1/admin/invite-codes");
}

export function fetchMe() {
  return apiFetch<ApiUser>("/api/v1/users/me", {}, true);
}

export function persistSession(tokens: AuthToken) {
  tokenStore.set(tokens.access_token, tokens.refresh_token);
}

export function clearSession() {
  tokenStore.clear();
}

export function hasSession() {
  return Boolean(tokenStore.getAccess());
}

export async function resolveRoleFromInviteCode(code: string): Promise<UserRole> {
  try {
    const codes = await fetchInviteCodes();
    const found = codes.find((c) => c.code === code);
    if (found) return found.role;
  } catch {
    // fallback below
  }

  const lower = code.toLowerCase();
  if (lower.includes("tutor") || lower.includes("rep")) return "tutor";
  if (lower.includes("parent") || lower.includes("prn")) return "parent";
  if (lower.includes("admin")) return "admin";
  return "child";
}
