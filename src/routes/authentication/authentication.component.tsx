import SignInForm from "../../components/sign-in-form/sign-in-form.component.tsx";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component.tsx";
import "./authentication.styles.scss";

type Props = {};
const Authentication = ({}: Props) => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
export default Authentication;
