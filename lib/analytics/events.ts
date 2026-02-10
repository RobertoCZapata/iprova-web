/**
 * Google Analytics Event Tracking
 *
 * Funciones helper para trackear eventos personalizados en Google Analytics 4
 *
 * Documentación: https://developers.google.com/analytics/devguides/collection/ga4/events
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Trackear evento personalizado
 * @param eventName - Nombre del evento
 * @param params - Parámetros adicionales del evento
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};

/**
 * Trackear click en botón de WhatsApp
 */
export const trackWhatsAppClick = () => {
  trackEvent("contact_whatsapp", {
    event_category: "engagement",
    event_label: "WhatsApp Widget Click",
    value: 1,
  });
};

/**
 * Trackear click en botón de llamada telefónica
 * @param phoneNumber - Número telefónico clickeado
 */
export const trackPhoneClick = (phoneNumber: string) => {
  trackEvent("contact_phone", {
    event_category: "engagement",
    event_label: `Phone Click: ${phoneNumber}`,
    value: 1,
  });
};

/**
 * Trackear envío de formulario de contacto
 * @param formName - Nombre del formulario
 */
export const trackFormSubmit = (formName: string = "contact_form") => {
  trackEvent("form_submit", {
    event_category: "conversion",
    event_label: formName,
    value: 5,
  });
};

/**
 * Trackear click en email
 * @param emailAddress - Dirección de email clickeada
 */
export const trackEmailClick = (emailAddress: string) => {
  trackEvent("contact_email", {
    event_category: "engagement",
    event_label: `Email Click: ${emailAddress}`,
    value: 1,
  });
};

/**
 * Trackear navegación a sección específica
 * @param sectionName - Nombre de la sección
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent("section_view", {
    event_category: "navigation",
    event_label: sectionName,
  });
};

/**
 * Trackear descarga de archivo
 * @param fileName - Nombre del archivo descargado
 */
export const trackDownload = (fileName: string) => {
  trackEvent("file_download", {
    event_category: "engagement",
    event_label: fileName,
    value: 1,
  });
};

/**
 * Trackear click en CTA (Call to Action)
 * @param ctaName - Nombre del CTA
 * @param ctaLocation - Ubicación del CTA en la página
 */
export const trackCTAClick = (ctaName: string, ctaLocation: string) => {
  trackEvent("cta_click", {
    event_category: "engagement",
    event_label: ctaName,
    cta_location: ctaLocation,
    value: 2,
  });
};
