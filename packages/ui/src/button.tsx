"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className="text-sm underline px-4 bg-emerald-500 hover:bg-emerald-700 text-white p-1 rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
