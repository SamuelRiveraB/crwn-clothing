import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.ts";

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
    </div>
  );
};
export default SignIn;
