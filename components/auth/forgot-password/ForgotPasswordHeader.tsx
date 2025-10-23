type Props = {};

const ForgotPasswordHeader = ({}: Props) => {
  return (
    <div>
      <h1 className="font-rubik text-2xl font-semibold text-textPrimary md:text-3xl">
        Forgot Password
      </h1>
      <p className="text-black/50 max-md:text-sm">
        If the email is registered with us, you will receive a password reset
        link.
      </p>
    </div>
  );
};

export default ForgotPasswordHeader;
