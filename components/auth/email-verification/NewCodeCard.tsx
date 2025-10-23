import AuthCardWrapper from "../AuthCardWrapper";
import AuthFooter from "../AuthFooter";
import NewCodeForm from "./NewCodeForm";
import NewCodeHeader from "./NewCodeHeader";

type Props = {};

const NewCodeCard = ({}: Props) => {
  return (
    <AuthCardWrapper>
      <NewCodeHeader />
      <NewCodeForm />
      <hr className="border-gray-400" />
      <AuthFooter
        showResetPassword={false}
        showSignUp={false}
        customSignInLabel="Remember your password?"
      />
    </AuthCardWrapper>
  );
};

export default NewCodeCard;
