"use client";

import { usePathname } from "next/navigation";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export function ConditionalWidgets() {
  const pathname = usePathname();

  // No mostrar widgets en rutas administrativas o de autenticación
  const isAdminRoute = pathname?.startsWith("/admin");
  const isAuthRoute = pathname?.startsWith("/auth");

  if (isAdminRoute || isAuthRoute) {
    return null;
  }

  return <WhatsAppWidget />;
}
