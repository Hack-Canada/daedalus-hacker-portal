type Props = {};

const ResetPasswordHeader = ({}: Props) => {
  return (
    <div className="space-y-1">
      <h1 className="font-rubik text-2xl font-bold text-white md:text-3xl">
        Reset Password
      </h1>
      <p className="text-white/60 text-sm md:text-base">
        Please enter your new password.
      </p>
    </div>
  );
};

export default ResetPasswordHeader;
