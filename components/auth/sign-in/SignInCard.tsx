import AuthCardWrapper from "../AuthCardWrapper";
import AuthFooter from "../AuthFooter";
import SignInForm from "./SignInForm";
import SignInHeader from "./SignInHeader";

type Props = {};

const SignInCard = ({}: Props) => {
  return (
    <AuthCardWrapper>
      <SignInHeader />
      <SignInForm />
      <hr className="border-white/20" />
      <AuthFooter showSignIn={false} />
    </AuthCardWrapper>
  );
};

export default SignInCard;
