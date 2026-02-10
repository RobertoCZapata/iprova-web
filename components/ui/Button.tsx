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
  "aria-label"?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:ring-primary-light group";

  const variants = {
    primary:
      "bg-white text-primary hover:bg-gray-50 hover:shadow-2xl hover:scale-105 shadow-lg active:scale-100 transform transition-all duration-300",
    "outline-light":
      "border-2 border-white text-white hover:bg-white hover:text-primary hover:shadow-xl hover:scale-105 active:scale-100 transform transition-all duration-300",
    ghost: "text-primary hover:text-primary-light hover:underline transition-all duration-200",
  };

  const sizes = {
    sm: "h-10 px-5 text-sm",
    md: "h-12 px-8 text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

