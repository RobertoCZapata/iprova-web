import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "outline" | "outline-light" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
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
  disabled = false,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:ring-primary-light group disabled:opacity-50 disabled:cursor-not-allowed [&>*]:relative [&>*]:z-10";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 active:scale-95 transform transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
    outline:
      "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200",
    "outline-light":
      "border-2 border-white text-white hover:bg-white hover:text-primary hover:shadow-xl hover:scale-105 active:scale-100 transform transition-all duration-300",
    ghost: "text-primary hover:text-primary-light hover:underline transition-all duration-200",
  };

  const sizes = {
    sm: "h-10 px-5 text-sm",
    md: "h-12 px-8 text-base",
    lg: "h-14 px-10 text-lg",
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
    <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

