"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle, Copy, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createCaseSchema, type CreateCaseFormData } from "@/lib/validations/case";
import { parseApiError } from "@/lib/utils/api-errors";
import { copyToClipboard } from "@/lib/utils/clipboard";

interface CreateCaseModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateCaseModal({ onClose, onSuccess }: CreateCaseModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdCaseNumber, setCreatedCaseNumber] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCaseFormData>({
    resolver: zodResolver(createCaseSchema),
    defaultValues: {
      title: "",
      client_name: "",
      client_email: "",
      client_phone: "",
      case_type: "penal",
      priority: "media",
      description: "",
      deadline: "",
    },
  });

  const onSubmit = async (data: CreateCaseFormData) => {
    try {
      const response = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await parseApiError(response);
        toast.error(errorMessage);
        return;
      }

      const newCase = await response.json();
      setCreatedCaseNumber(newCase.case_number);
      setShowSuccess(true);
      toast.success("Caso creado exitosamente");
    } catch (error) {
      console.error("Error al crear caso:", error);
      const errorMessage = error instanceof Error ? error.message : "Error al crear caso";
      toast.error(errorMessage);
    }
  };

  const handleCopyCode = async () => {
    const success = await copyToClipboard(createdCaseNumber);
    if (success) {
      toast.success("Código copiado al portapapeles");
    } else {
      toast.error("No se pudo copiar el código. Cópialo manualmente");
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setCreatedCaseNumber("");
    onSuccess();
  };

  // Modal de éxito
  if (showSuccess) {
    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
      >
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-green-600" aria-hidden="true" />
            </div>
            <h2 id="success-modal-title" className="text-2xl font-bold text-gray-900 mb-2">
              ¡Caso Creado Exitosamente!
            </h2>
            <p className="text-gray-600 mb-6">
              Comparte este código con tu cliente para que pueda consultar el estado de su caso
            </p>
          </div>

          <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6 mb-6">
            <label htmlFor="case-code" className="block text-sm font-semibold text-gray-700 mb-2">
              Código del Caso
            </label>
            <div className="flex items-center justify-center gap-3">
              <code
                id="case-code"
                className="text-3xl font-bold text-primary tracking-wider"
                aria-label={`Código del caso: ${createdCaseNumber}`}
              >
                {createdCaseNumber}
              </code>
              <button
                onClick={handleCopyCode}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                title="Copiar código"
                aria-label="Copiar código del caso al portapapeles"
              >
                <Copy size={24} className="text-primary" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={handleCloseSuccess} variant="primary" className="w-full">
              Entendido
            </Button>
            <p className="text-sm text-gray-500">
              El cliente puede consultar su caso en:{" "}
              <span className="font-mono text-primary">iprova.com.co/consultar-caso</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Modal de formulario
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-case-modal-title"
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 id="create-case-modal-title" className="text-xl font-bold text-gray-900">
            Crear Nuevo Caso
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Título del Caso */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título del Caso <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title")}
                id="title"
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ej: Demanda laboral por despido injustificado"
                disabled={isSubmitting}
                aria-invalid={errors.title ? "true" : "false"}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && (
                <p id="title-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Nombre del Cliente */}
            <div className="md:col-span-2">
              <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Cliente <span className="text-red-500">*</span>
              </label>
              <input
                {...register("client_name")}
                id="client_name"
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.client_name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nombre completo"
                disabled={isSubmitting}
                aria-invalid={errors.client_name ? "true" : "false"}
                aria-describedby={errors.client_name ? "client_name-error" : undefined}
              />
              {errors.client_name && (
                <p id="client_name-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.client_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="client_email" className="block text-sm font-medium text-gray-700 mb-1">
                Email del Cliente
              </label>
              <input
                {...register("client_email")}
                id="client_email"
                type="email"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.client_email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="email@ejemplo.com"
                disabled={isSubmitting}
                aria-invalid={errors.client_email ? "true" : "false"}
                aria-describedby={errors.client_email ? "client_email-error" : undefined}
              />
              {errors.client_email && (
                <p id="client_email-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.client_email.message}
                </p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="client_phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono del Cliente
              </label>
              <input
                {...register("client_phone")}
                id="client_phone"
                type="tel"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.client_phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="300 123 4567"
                disabled={isSubmitting}
                aria-invalid={errors.client_phone ? "true" : "false"}
                aria-describedby={errors.client_phone ? "client_phone-error" : undefined}
              />
              {errors.client_phone && (
                <p id="client_phone-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.client_phone.message}
                </p>
              )}
            </div>

            {/* Tipo de Caso */}
            <div>
              <label htmlFor="case_type" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Caso <span className="text-red-500">*</span>
              </label>
              <select
                {...register("case_type")}
                id="case_type"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.case_type ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
                aria-invalid={errors.case_type ? "true" : "false"}
                aria-describedby={errors.case_type ? "case_type-error" : undefined}
              >
                <option value="penal">Penal</option>
                <option value="laboral">Laboral</option>
                <option value="comercial">Comercial</option>
                <option value="disciplinario">Disciplinario</option>
                <option value="investigacion">Investigación</option>
                <option value="consultoria">Consultoría</option>
              </select>
              {errors.case_type && (
                <p id="case_type-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.case_type.message}
                </p>
              )}
            </div>

            {/* Prioridad */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Prioridad <span className="text-red-500">*</span>
              </label>
              <select
                {...register("priority")}
                id="priority"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.priority ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
                aria-invalid={errors.priority ? "true" : "false"}
                aria-describedby={errors.priority ? "priority-error" : undefined}
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
              {errors.priority && (
                <p id="priority-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.priority.message}
                </p>
              )}
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                id="description"
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Detalles del caso (mínimo 20 caracteres)..."
                disabled={isSubmitting}
                aria-invalid={errors.description ? "true" : "false"}
                aria-describedby={errors.description ? "description-error" : undefined}
              />
              {errors.description && (
                <p id="description-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button onClick={onClose} variant="outline" type="button" disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear Caso"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
