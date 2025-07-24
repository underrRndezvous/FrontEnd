import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button1 = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="w-full rounded-[5px] bg-main py-[15px] text-black body-02 transition-colors hover:bg-opacity-80"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button1;
