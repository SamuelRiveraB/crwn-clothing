import type { ReactNode } from "react";
import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

type ButtonProps = {
  children: ReactNode;
  buttonType?: "google" | "inverted";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, buttonType, ...otherProps }: ButtonProps) => {
  return (
    <button
      className={`button-container ${
        buttonType ? BUTTON_TYPE_CLASSES[buttonType] : ""
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
