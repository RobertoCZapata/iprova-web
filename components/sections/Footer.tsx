import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
} from "lucide-react";
import { contactInfo, socialLinks, footerContent } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-primary text-white" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center">
                <Shield className="text-white h-6 w-6" />
              </div>
              <span className="text-white font-bold text-2xl tracking-widest">
                {footerContent.brand.name}
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {footerContent.brand.description}
            </p>
            <div className="flex space-x-4 mb-6">
              <a
                href={socialLinks.facebook}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href={socialLinks.instagram}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            {/* Enlaces internos rápidos */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Navegación
              </h4>
              <ul className="space-y-1">
                <li>
                  <a
                    href="#inicio"
                    className="text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#nosotros"
                    className="text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    Servicios
                  </a>
                </li>
                <li>
                  <a
                    href="#equipo"
                    className="text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    Equipo
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-600 pb-2 inline-block">
              Ubicación
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {contactInfo.address.street}
                  <br />
                  {contactInfo.address.neighborhood}
                  <br />
                  {contactInfo.address.city}
                </span>
              </li>
            </ul>
          </div>

          {/* Teléfonos */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-600 pb-2 inline-block">
              Teléfonos
            </h3>
            <ul className="space-y-4">
              {contactInfo.phones.map((phone) => (
                <li key={phone} className="flex items-center">
                  <Phone className="text-gray-400 mr-2 flex-shrink-0" />
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Online */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-600 pb-2 inline-block">
              Online
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="text-gray-400 mr-2 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.emails.abogados}`}
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  {contactInfo.emails.abogados}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="text-gray-400 mr-2 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.emails.investigadores}`}
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  {contactInfo.emails.investigadores}
                </a>
              </li>
              <li className="flex items-center">
                <Globe className="text-gray-400 mr-2 flex-shrink-0" />
                <a
                  href={`https://${contactInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  {contactInfo.website}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">{footerContent.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
