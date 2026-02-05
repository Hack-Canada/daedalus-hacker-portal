import AuthCardWrapper from "../AuthCardWrapper";
import AuthFooter from "../AuthFooter";
import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordHeader from "./ResetPasswordHeader";

const ResetPasswordCard = ({ token }: { token: string }) => {
  return (
    <AuthCardWrapper showTabs={false}>
      <ResetPasswordHeader />
      <ResetPasswordForm token={token} />
      <AuthFooter showResetPassword={false} />
    </AuthCardWrapper>
  );
};

export default ResetPasswordCard;
