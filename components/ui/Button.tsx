import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "outline-light" | "ghost";
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:ring-primary-light group";

  const variants = {
    primary:
      "bg-white text-primary hover:bg-gray-50 shadow-lg active:scale-105 transform transition-transform",
    "outline-light":
      "border border-white text-white hover:bg-white hover:text-primary active:scale-105 transform transition-colors",
    ghost: "text-primary hover:text-primary-light transition-colors",
  };

  const sizes = {
    sm: "h-10 px-5 text-sm",
    md: "h-12 px-8 text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

