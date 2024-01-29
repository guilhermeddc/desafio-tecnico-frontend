import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "outlined" | "contained";
}

export const Button: React.FC<IProps> = ({
  text,
  variant = "contained",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`w-full min-w-36 ${
        variant === "contained"
          ? "text-black bg-lime-500"
          : "text-lime-500 bg-ada border border-lime-500"
      } hover:opacity-80 font-medium rounded-md text-sm px-3 py-4 text-center`}
    >
      {text}
    </button>
  );
};
