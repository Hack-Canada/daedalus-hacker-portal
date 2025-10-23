import AuthCardWrapper from "../AuthCardWrapper";
import AuthFooter from "../AuthFooter";
import SignUpForm from "./SignUpForm";
import SignUpHeader from "./SignUpHeader";

type Props = {};

const SignUpCard = ({}: Props) => {
  return (
    <AuthCardWrapper>
      <SignUpHeader />
      <SignUpForm />
      <hr className="border-gray-400" />
      <AuthFooter
        showResetPassword={false}
        showContactUs={false}
        showSignUp={false}
      />
    </AuthCardWrapper>
  );
};

export default SignUpCard;
