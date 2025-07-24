import React from "react";
import clsx from "clsx";

const colorStyles = {
  main: "border-main bg-white", // main 색상 테두리
  gray2: "border-gray2 bg-white", // gray2 색상 테두리
};

type inputColor = keyof typeof colorStyles;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: inputColor;
}

const Input = ({ className, color = "gray2", ...props }: InputProps) => {
  const baseStyles =
    "w-full rounded-[5px] border px-8 py-2 body-02 text-black outline-none transition-colors focus:border-main";

  return (
    <input
      className={clsx(baseStyles, colorStyles[color], className)}
      {...props}
    />
  );
};

export default Input;
