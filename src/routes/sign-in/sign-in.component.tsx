import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.ts";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component.tsx";

type Props = {};
const SignIn = ({}: Props) => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth({
      uid: user.uid,
      displayName: user.displayName || undefined,
      email: user.email || undefined,
    });
    console.log("userDocRef", userDocRef);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};
export default SignIn;
