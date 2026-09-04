/**
 * Maps Supabase Auth errors and network failures to clear, distinguishable user-friendly messages.
 */
export function parseAuthError(err: any): string {
  if (!err) return "An unexpected error occurred. Please try again.";

  const rawMsg = (err.message || err.error_description || "").toLowerCase();
  const code = (err.code || "").toLowerCase();
  const status = err.status;

  // 1. Provider / Signups Disabled
  if (
    code === "email_provider_disabled" || 
    rawMsg.includes("email signups are disabled") || 
    rawMsg.includes("email logins are disabled") ||
    rawMsg.includes("signups not allowed")
  ) {
    return "Email authentication is currently disabled in your Supabase project settings. Please enable the Email Provider under Authentication > Providers > Email in your Supabase dashboard.";
  }

  // 2. User Already Exists
  if (
    code === "user_already_exists" || 
    rawMsg.includes("already registered") || 
    rawMsg.includes("already in use") ||
    rawMsg.includes("user with this email already exists")
  ) {
    return "An account with this email address already exists. Please sign in instead.";
  }

  // 3. Invalid Credentials
  if (
    code === "invalid_credentials" || 
    rawMsg.includes("invalid login credentials") || 
    rawMsg.includes("invalid email or password") ||
    rawMsg.includes("invalid password")
  ) {
    return "Invalid email or password. Please verify your credentials.";
  }

  // 4. Email Confirmation Required
  if (
    rawMsg.includes("email not confirmed") || 
    rawMsg.includes("email_not_confirmed")
  ) {
    return "Email confirmation is required by your Supabase project. Please disable 'Confirm email' in Supabase Auth settings for immediate access.";
  }

  // 5. Weak Password
  if (
    code === "weak_password" || 
    rawMsg.includes("password should be at least") ||
    rawMsg.includes("weak password")
  ) {
    return "Password is too weak. Please use a password with at least 6 characters.";
  }

  // 6. Rate Limiting
  if (
    code === "over_request_rate_limit" || 
    status === 429 || 
    rawMsg.includes("rate limit") || 
    rawMsg.includes("too many requests")
  ) {
    return "Too many requests. Please wait a few moments before trying again.";
  }

  // 7. Network / Connectivity Failures
  if (
    rawMsg.includes("fetch failed") || 
    rawMsg.includes("network") || 
    rawMsg.includes("failed to fetch") ||
    rawMsg.includes("connection refused")
  ) {
    return "Network connection failure. Please check your internet connection and verify that your Supabase URL is accessible.";
  }

  // Return the original message if it doesn't match standard codes
  return err.message || "Authentication failed. Please try again.";
}
