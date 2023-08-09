import { FC } from "react";
import buttonStyles from "./Button.module.scss";
import { ButtonProps } from "./Button.types";
import clsx from "clsx";
import { FaCircleNotch } from "react-icons/fa";

export const Button: FC<ButtonProps> = ({
  className,
  children,
  loading,
  type = "button",
  ...props
}) => (
  <button
    className={clsx(
      className,
      buttonStyles.button,
      loading && buttonStyles.buttonLoading
    )}
    type={type}
    {...props}
  >
    {children}
    {loading && (
      <span className={buttonStyles.buttonLoader}>
        <FaCircleNotch />
      </span>
    )}
  </button>
);
