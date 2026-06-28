import { apiFetch } from "./client";
import type {
  EmailReceipt,
  FinanceReportRow,
  InviteCode,
  ApiUser,
} from "./types";

export function fetchInviteCodes() {
  return apiFetch<InviteCode[]>("/api/v1/admin/invite-codes");
}

export function createInviteCodes(payload: { role: string; description?: string }) {
  return apiFetch<InviteCode[]>("/api/v1/admin/invite-codes", {
    method: "POST",
    body: JSON.stringify(payload),
  }, true);
}

export function fetchAllUsers() {
  return apiFetch<ApiUser[]>("/api/v1/users/", {}, true);
}

export function fetchFinanceReport(weekStart?: string) {
  const q = weekStart ? `?week_start=${weekStart}` : "";
  return apiFetch<FinanceReportRow[]>(`/api/v1/admin/finance-report${q}`, {}, true);
}

export function fetchReceipts() {
  return apiFetch<EmailReceipt[]>("/api/v1/admin/receipts", {}, true);
}

export function parseEmails() {
  return apiFetch<{ new_receipts: number; message: string }>(
    "/api/v1/admin/receipts/parse-emails",
    { method: "POST", body: JSON.stringify({}) },
    true,
  );
}
