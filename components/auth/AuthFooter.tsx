import Link from "next/link";

type Props = {
  showSignIn?: boolean;
  showSignUp?: boolean;
  showResetPassword?: boolean;
  showContactUs?: boolean;
  customSignInLabel?: string;
};

const AuthFooter = ({
  showSignIn = true,
  showSignUp = true,
  showResetPassword = true,
  showContactUs = true,
  customSignInLabel,
}: Props) => {
  return (
    <div className="flex flex-col space-y-3">
      {showSignIn && (
        <p className="text-muted-foreground text-center text-sm">
          {customSignInLabel || "Already have an account?"}{" "}
          <Link
            href="/sign-in"
            className="text-primary hover:text-primary/80 font-medium transition-all hover:underline"
          >
            Sign In
          </Link>
        </p>
      )}
      {showSignUp && (
        <p className="text-muted-foreground text-center text-sm">
          New to Hack Canada?{" "}
          <Link
            href="/sign-up"
            className="text-primary hover:text-primary/80 font-medium transition-all hover:underline"
          >
            Sign Up
          </Link>
        </p>
      )}
      <div className="flex items-center justify-around">
        {showResetPassword && (
          <Link
            href="/forgot-password"
            className="text-primary hover:text-primary/80 text-center text-sm font-medium transition-all hover:underline"
          >
            Forgot your password?
          </Link>
        )}
        {showContactUs && (
          <Link
            href="mailto:hi@hackcanada.org"
            target="_blank"
            className="text-primary hover:text-primary/80 text-right text-sm font-medium transition-all hover:underline"
          >
            Having trouble?
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthFooter;
