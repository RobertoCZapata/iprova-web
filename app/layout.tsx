import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// URL base del sitio (ajustar según el dominio de producción)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://iprova-web.vercel.app";

export const metadata: Metadata = {
  title: "iPROVA - Abogados e Investigadores | Inteligencia Jurídica e Investigación Privada",
  description:
    "Superar lo hecho es ir más allá. iPROVA ofrece servicios de Inteligencia Jurídica e Investigación Privada. Abogados especializados en defensa penal, investigación corporativa y seguridad. 20+ años de experiencia, 95% de casos exitosos.",
  keywords: [
    "abogados colombia",
    "abogados bucaramanga",
    "abogados santander",
    "abogados floridablanca",
    "investigación privada bucaramanga",
    "inteligencia jurídica",
    "abogado penalista bucaramanga",
    "abogado penalista santander",
    "defensa penal bucaramanga",
    "investigación corporativa",
    "seguridad corporativa",
    "abogado comercial santander",
    "detective privado bucaramanga",
    "zapata pedraza",
    "iPROVA",
  ],
  authors: [{ name: "iPROVA" }],
  creator: "iPROVA - Abogados e Investigadores",
  publisher: "iPROVA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: "iPROVA - Abogados e Investigadores",
    title: "iPROVA - Abogados e Investigadores | Inteligencia Jurídica e Investigación Privada",
    description:
      "Superar lo hecho es ir más allá. iPROVA ofrece servicios de Inteligencia Jurídica e Investigación Privada. Abogados especializados con 20+ años de experiencia.",
    images: [
      {
        url: `${siteUrl}/images/iProva-logo.png`,
        width: 700,
        height: 700,
        alt: "iPROVA - Abogados e Investigadores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iPROVA - Abogados e Investigadores",
    description:
      "Inteligencia Jurídica e Investigación Privada. 20+ años de experiencia, 95% de casos exitosos.",
    images: [`${siteUrl}/images/iProva-logo.png`],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (Schema.org) para mejor SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    name: "iPROVA - Abogados e Investigadores",
    alternateName: "ZAPATA & PEDRAZA",
    description:
      "Servicios de Inteligencia Jurídica e Investigación Privada. Abogados especializados en defensa penal, investigación corporativa y seguridad. Más de 20 años de experiencia.",
    url: siteUrl,
    logo: `${siteUrl}/images/iProva-logo.png`,
    image: `${siteUrl}/images/iProva-logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle 33 # 8-50",
      addressLocality: "Floridablanca",
      addressRegion: "Santander",
      postalCode: "681003",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "7.0620",
      longitude: "-73.0864",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Bucaramanga",
      },
      {
        "@type": "City",
        name: "Floridablanca",
      },
      {
        "@type": "State",
        name: "Santander",
      },
      {
        "@type": "Country",
        name: "Colombia",
      },
    ],
    telephone: ["+57 317 368 4975", "+57 318 220 0086"],
    email: "abogados@iprova.com.co",
    priceRange: "$$",
    openingHours: "Mo-Fr 08:00-18:00",
    founders: [
      {
        "@type": "Person",
        name: "Henry Zapata Reyes",
        jobTitle: "Socio Fundador - Abogado Penalista",
        description: "Especialista en teoría del caso, defensa sancionatoria y contrainterrogatorio",
      },
      {
        "@type": "Person",
        name: "Javier Pedraza",
        jobTitle: "Socio Fundador - Investigador Privado",
        description: "Especialista en investigación privada y evidencia",
      },
    ],
    serviceType: [
      "Defensa Penal",
      "Derecho Disciplinario",
      "Investigación Privada",
      "Investigación Corporativa",
      "Seguridad Corporativa",
      "Asesoría Legal Comercial",
      "Derecho Laboral",
      "Contrainterrogatorio",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "95",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <html lang="es" className={montserrat.variable}>
      <head>
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans">
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}

