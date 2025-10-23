import AuthCardWrapper from "../AuthCardWrapper";
import AuthFooter from "../AuthFooter";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordHeader from "./ForgotPasswordHeader";

type Props = {};

const ForgotPasswordCard = ({}: Props) => {
  return (
    <AuthCardWrapper>
      <ForgotPasswordHeader />
      <ForgotPasswordForm />
      <hr className="border-gray-400" />
      <AuthFooter
        showResetPassword={false}
        showSignUp={false}
        customSignInLabel="Remember your password"
      />
    </AuthCardWrapper>
  );
};

export default ForgotPasswordCard;
