/**
 * Copia texto al portapapeles con fallback para navegadores antiguos
 * @param text - Texto a copiar
 * @returns Promise que resuelve true si tuvo éxito, false si falló
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Método moderno (Clipboard API)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error("Error al copiar con Clipboard API:", error);
      // Intentar con fallback
    }
  }

  // Fallback para navegadores antiguos o contextos no seguros
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    return successful;
  } catch (error) {
    console.error("Error al copiar con fallback:", error);
    return false;
  }
}
