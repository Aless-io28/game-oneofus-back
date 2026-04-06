export interface ErrorCode {
  code: string; // USER_001
  message: string; // i18n key → user.email.invalid
  status: number; // HTTP status
  field?: string; // Optional field name related to the error, e.g., 'email'
  args?: Record<string, unknown>;
}
