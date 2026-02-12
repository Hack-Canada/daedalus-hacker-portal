type Props = {};

const ForgotPasswordHeader = ({}: Props) => {
  return (
    <div className="space-y-1">
      <h1 className="font-rubik text-2xl font-bold text-white md:text-3xl">
        Forgot Password
      </h1>
      <p className="text-white/60 text-sm md:text-base">
        If the email is registered with us, you will receive a password reset
        link.
      </p>
    </div>
  );
};

export default ForgotPasswordHeader;
