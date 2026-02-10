"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

/**
 * Google Analytics 4 (GA4) Component
 *
 * Este componente carga Google Analytics 4 en el sitio.
 *
 * @param measurementId - El ID de medición de GA4 (formato: G-XXXXXXXXXX)
 *
 * Uso:
 * <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
 *
 * Documentación: https://developers.google.com/analytics/devguides/collection/ga4
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // No cargar analytics en desarrollo
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  // Validar que existe el measurement ID
  if (!measurementId || !measurementId.startsWith("G-")) {
    console.warn(
      "Google Analytics: Measurement ID no configurado o inválido. " +
      "Agrega NEXT_PUBLIC_GA_MEASUREMENT_ID a tu archivo .env.local"
    );
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />

      {/* Google Analytics Initialization */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
