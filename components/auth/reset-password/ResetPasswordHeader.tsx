type Props = {};

const ResetPasswordHeader = ({}: Props) => {
  return (
    <div>
      <h1 className="font-rubik text-2xl font-semibold text-textPrimary md:text-3xl">
        Reset Password
      </h1>
      <p className="text-black/50 max-md:text-sm">
        Please enter your new password.
      </p>
    </div>
  );
};

export default ResetPasswordHeader;
