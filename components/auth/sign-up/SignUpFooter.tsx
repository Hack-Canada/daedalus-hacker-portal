type Props = {};

const SignUpFooter = ({}: Props) => {
  return (
    <div className="flex flex-col">
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a
          href="/sign-in"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign In
        </a>
      </p>
    </div>
  );
};

export default SignUpFooter;
