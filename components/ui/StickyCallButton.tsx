"use client";

import { Phone } from "lucide-react";
import { contactInfo } from "@/lib/data";

export function StickyCallButton() {
  // Tomar el primer teléfono de la lista
  const phoneNumber = contactInfo.phones[0]?.replace(/\s/g, "") || "";

  if (!phoneNumber) return null;

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-20 left-4 z-50 md:hidden bg-primary text-white rounded-full p-4 shadow-2xl hover:bg-primary-light transition-all duration-300 animate-pulse hover:animate-none"
      aria-label="Llamar ahora"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
