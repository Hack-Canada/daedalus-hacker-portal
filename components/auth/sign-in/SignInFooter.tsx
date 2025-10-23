type Props = {};

const SignInFooter = ({}: Props) => {
  return (
    <div className="flex flex-col">
      <p className="text-center text-sm text-muted-foreground">
        New to Hack Canada?{" "}
        <a
          href="/sign-up"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign Up
        </a>
      </p>
      <p className="text-center text-sm text-muted-foreground">
        Forgot your password?{" "}
        <a
          href="/forgot-password"
          className="underline underline-offset-4 hover:text-primary"
        >
          Reset Password
        </a>
      </p>
    </div>
  );
};

export default SignInFooter;
