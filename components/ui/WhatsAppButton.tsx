import { MessageCircle } from "lucide-react";
import { whatsappConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  className?: string;
}

export function WhatsAppButton({ className }: WhatsAppButtonProps) {
  const href = `https://wa.me/${whatsappConfig.phoneE164.replace(
    "+",
    "",
  )}?text=${encodeURIComponent(whatsappConfig.defaultMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chatear por WhatsApp con iPROVA (${whatsappConfig.displayPhone})`}
      className={cn(
        "fixed bottom-4 right-4 z-40 inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-900/40 h-14 w-14 md:h-16 md:w-16 transition-all transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:ring-emerald-400",
        className,
      )}
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
    </a>
  );
}


