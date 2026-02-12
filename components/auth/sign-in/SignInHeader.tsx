type Props = {};

const SignInHeader = ({}: Props) => {
  return (
    <div className="space-y-1">
      <h1 className="font-rubik text-2xl font-bold text-white md:text-3xl">
        Sign In
      </h1>
      <p className="text-sm text-white/60 md:text-base">
        to continue to Hack Canada
      </p>
    </div>
  );
};

export default SignInHeader;
