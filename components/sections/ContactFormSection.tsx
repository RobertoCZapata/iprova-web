"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { contactInfo } from "@/lib/data";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^[0-9\s\-\+\(\)]{7,}$/.test(formData.phone)) {
      newErrors.phone = "El teléfono no es válido";
    }

    if (!formData.service) {
      newErrors.service = "Por favor selecciona un servicio";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí puedes integrar con tu servicio de email preferido
      // Ejemplo con Web3Forms (gratis y sin backend)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Reemplazar con tu access key
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          subject: `Nueva consulta de ${formData.name} - ${formData.service}`,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section className="py-20 bg-gray-50" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-3">
            Contáctanos
          </h2>
          <div className="h-1 w-24 bg-secondary mx-auto" />
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Completa el formulario y nos pondremos
            en contacto contigo lo antes posible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Dirección
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {contactInfo.address.street}
                      <br />
                      {contactInfo.address.neighborhood}
                      <br />
                      {contactInfo.address.city}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Teléfonos
                    </h4>
                    {contactInfo.phones.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="block text-gray-600 hover:text-primary transition-colors text-sm"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a
                      href={`mailto:${contactInfo.emails.abogados}`}
                      className="block text-gray-600 hover:text-primary transition-colors text-sm"
                    >
                      {contactInfo.emails.abogados}
                    </a>
                    <a
                      href={`mailto:${contactInfo.emails.investigadores}`}
                      className="block text-gray-600 hover:text-primary transition-colors text-sm"
                    >
                      {contactInfo.emails.investigadores}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-primary rounded-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 size={24} />
                <h4 className="font-bold text-lg">Compromisos de servicio</h4>
              </div>
              <ul className="space-y-2 text-sm text-white/90">
                <li>✓ Confirmación de recepción del mensaje</li>
                <li>✓ Tiempo de respuesta estimado: 1 día hábil</li>
                <li>✓ Confidencialidad y reserva profesional</li>
                <li>✓ ZAPATA & PEDRAZA: experiencia combinada de más de dos décadas</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
                  <CheckCircle2 size={20} />
                  <p className="text-sm font-medium">
                    ¡Mensaje enviado exitosamente! Nos pondremos en contacto
                    contigo pronto.
                  </p>
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <p className="text-sm font-medium">
                    Hubo un error al enviar tu mensaje. Por favor, intenta
                    nuevamente o contáctanos por teléfono.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Juan Pérez"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="juan@ejemplo.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.phone
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="+57 300 123 4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Servicio de interés <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.service
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="defensa-judicial">Defensa Judicial</option>
                    <option value="defensa-lesiones">
                      Defensa de Lesiones
                    </option>
                    <option value="asesoria-juridica">Asesoría Jurídica</option>
                    <option value="investigacion-judicial">
                      Investigación Judicial
                    </option>
                    <option value="seguridad-corporativa">
                      Seguridad Corporativa
                    </option>
                    <option value="contrainterrogacion">
                      Contra-Interrogación
                    </option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.service}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none ${
                    errors.message
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Cuéntanos sobre tu caso o consulta..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white px-8 py-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-primary-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Al enviar este formulario, aceptas nuestra política de
                privacidad y el tratamiento de tus datos personales.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
