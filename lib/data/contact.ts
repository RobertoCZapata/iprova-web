/**
 * Contact Information
 * Información de contacto y configuración de WhatsApp
 */

// Contact Information (del Manual de Marca)
export const contactInfo = {
  address: {
    street: "Calle 33 # 8-50",
    neighborhood: "Cañaveral - Floridablanca",
    city: "Santander - Colombia",
    coordinates: {
      lat: 7.070413,
      lng: -73.103396,
    },
    // URL de Google Maps con coordenadas exactas
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=7.070413,-73.103396",
  },
  phones: ["+57 317 368 4975", "+57 318 220 0086"],
  emails: {
    abogados: "abogados@iprova.com.co",
    investigadores: "investigadores@iprova.com.co",
  },
  website: "www.iprova.com.co",
} as const;

// WhatsApp Configuration
export const whatsappConfig = {
  phoneE164: "+573182200086", // Número principal en formato E.164 (WhatsApp)
  displayPhone: "+57 318 220 0086",
  defaultMessage:
    "Hola, me gustaría agendar una consulta con iPROVA. Vengo desde el sitio web.",
} as const;

// CTA Section Content
export const ctaContent = {
  title: "¿Necesitas Asesoría Legal Profesional?",
  description:
    "Agenda una consulta. Te respondemos con una ruta inicial y un plan de trabajo.",
  phone: {
    label: "Llámanos ahora",
    number: "+57 317 368 4975",
    href: "tel:+573173684975",
  },
  whatsapp: {
    label: "Escríbenos por WhatsApp",
    action: "Abrir WhatsApp",
    message: "Hola iPROVA, necesito asesoría legal profesional. Vengo desde el sitio web.",
  },
  email: {
    label: "Escríbenos",
    action: "Enviar Mensaje",
    href: "mailto:abogados@iprova.com.co",
  },
  guarantee: "Tiempo de respuesta estimado: 1 día hábil",
  freeConsultation: "Respondemos lo antes posible. En casos urgentes, priorizamos la atención",
} as const;

// Social Media Links
export const socialLinks = {
  facebook: "#",
  instagram: "#",
} as const;
