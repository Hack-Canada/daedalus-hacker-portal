export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  OAuthSignin:
    "Could not start sign-in. Please try again.",
  OAuthCallback:
    "Authentication failed during callback.",
  OAuthCreateAccount:
    "Unable to create account with this provider.",
  EmailCreateAccount:
    "Unable to create account with email.",
  Callback:
    "Authentication callback error.",
  OAuthAccountNotLinked:
    "This email is already linked with another sign-in method.",
  EmailSignin:
    "Failed to send verification email.",
  CredentialsSignin:
    "Invalid email or password.",
  SessionRequired:
    "Please sign in to continue.",
  AccessDenied:
    "Access denied.",
  Configuration:
    "Authentication configuration error.",
  default:
    "Authentication failed. Please try again.",
};
