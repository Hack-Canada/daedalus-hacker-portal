import AuthCardWrapper from "../AuthCardWrapper";
import AuthFooter from "../AuthFooter";
import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordHeader from "./ResetPasswordHeader";

const ResetPasswordCard = ({ token }: { token: string }) => {
  return (
    <AuthCardWrapper>
      <ResetPasswordHeader />
      <ResetPasswordForm token={token} />
      <hr className="border-gray-400" />
      <AuthFooter showResetPassword={false} />
    </AuthCardWrapper>
  );
};

export default ResetPasswordCard;
