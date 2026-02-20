import Image from "next/image";
import type { ComponentProps } from "react";

interface LogoiProvaProps extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  width?: number;
  height?: number;
  className?: string;
}

export function LogoiProva({ width = 160, height = 50, className, ...props }: LogoiProvaProps) {
  return (
    <Image
      src="/icons/logo-iprova-safe.svg"
      alt="iPROVA - Abogados e Investigadores"
      width={width}
      height={height}
      className={`object-contain ${className || ""}`}
      priority
      {...props}
    />
  );
}
