import { useState } from 'react';
import { trackFormSubmit } from '@/lib/analytics/events';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface UseContactFormReturn {
  formData: ContactFormData;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  handleChange: (field: keyof ContactFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error al empezar a escribir
    if (error) setError(null);
  };

  const validate = (): boolean => {
    if (!formData.name.trim()) {
      setError('Por favor ingresa tu nombre');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Por favor ingresa tu email');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      return false;
    }

    if (!formData.message.trim()) {
      setError('Por favor ingresa un mensaje');
      return false;
    }

    if (formData.message.trim().length < 10) {
      setError('El mensaje debe tener al menos 10 caracteres');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar
    if (!validate()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      // Éxito
      setIsSuccess(true);

      // Track en Analytics
      trackFormSubmit('contact_form');

      // Limpiar formulario después de 2 segundos
      setTimeout(() => {
        setFormData(initialFormData);
        setIsSuccess(false);
      }, 3000);

    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'Error al enviar el mensaje. Por favor intenta nuevamente.';

      setError(errorMessage);
      console.error('Contact form error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setIsSuccess(false);
    setError(null);
    setIsLoading(false);
  };

  return {
    formData,
    isLoading,
    isSuccess,
    error,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
