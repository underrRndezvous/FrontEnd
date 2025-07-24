import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  format?: ButtonFormat;
  color?: ButtonColor;
}

type ButtonFormat = keyof typeof formatStyles;
type ButtonColor = keyof typeof colorStyles;

const formatStyles = {
  Button1: "w-full",
  Button2: "flex-1",
};
const colorStyles = {
  // primary = main 색상, secondary = gray1 색상
  primary: "bg-main text-black hover:bg-opacity-80",
  secondary: "bg-gray1 text-black hover:bg-opacity-80",
};

const Button = ({
  children,
  className,
  format = "Button1",
  color = "primary",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-[5px] py-[15px] body-02 transition-colors disabled:opacity-50";

  return (
    <button
      className={clsx(
        baseStyles,
        formatStyles[format],
        colorStyles[color],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
