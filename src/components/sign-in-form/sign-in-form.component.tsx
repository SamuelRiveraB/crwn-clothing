import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

type Props = {};
const SignInForm = ({}: Props) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await signInAuthUserWithEmailAndPassword(email, password);

      if (!res?.user) {
        throw new Error("No user returned from sign-in");
      }

      resetFormFields();
    } catch (error) {
      console.error("Error signing in user", error);
      if ((error as any).code === "auth/invalid-credential") {
        alert("Email or password is incorrect");
      } else {
        alert("Error signing in user");
      }
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          required
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          required
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google as "google-sign-in"}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
