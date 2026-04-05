export interface ErrorCode {
  code: string; // USER_001
  message: string; // i18n key → user.email.invalid
  status: number; // HTTP status
  args?: Record<string, unknown>;
}
