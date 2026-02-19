/**
 * Interfaz para errores de API estructurados
 */
export interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

/**
 * Parsea la respuesta de error del API y retorna un mensaje legible
 * @param response - Response object de fetch
 * @returns Mensaje de error específico
 */
export async function parseApiError(response: Response): Promise<string> {
  // Mensajes por status code
  const defaultMessages: Record<number, string> = {
    400: "Los datos enviados son inválidos",
    401: "No autorizado. Por favor inicia sesión nuevamente",
    403: "No tienes permisos para realizar esta acción",
    404: "El recurso solicitado no fue encontrado",
    409: "Ya existe un registro con estos datos",
    422: "Los datos no cumplen con las validaciones requeridas",
    429: "Demasiadas solicitudes. Intenta más tarde",
    500: "Error interno del servidor. Intenta más tarde",
    503: "Servicio temporalmente no disponible",
  };

  try {
    // Intentar parsear el JSON del error
    const errorData = await response.json();

    // Si el backend envía un mensaje, usarlo
    if (errorData.error) {
      return errorData.error;
    }

    if (errorData.message) {
      return errorData.message;
    }

    // Si hay detalles de validación, formatearlos
    if (errorData.details && Array.isArray(errorData.details)) {
      return errorData.details.join(", ");
    }
  } catch {
    // Si no se puede parsear JSON, usar mensaje por defecto
  }

  // Usar mensaje por defecto según status code
  return defaultMessages[response.status] || "Ocurrió un error inesperado";
}

/**
 * Wrapper para hacer fetch con mejor manejo de errores
 * @param url - URL del endpoint
 * @param options - Opciones de fetch
 * @returns Response con datos o lanza error con mensaje específico
 */
export async function fetchWithErrorHandling(
  url: string,
  options?: RequestInit
): Promise<Response> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = await parseApiError(response);
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error de red. Verifica tu conexión a internet");
  }
}
