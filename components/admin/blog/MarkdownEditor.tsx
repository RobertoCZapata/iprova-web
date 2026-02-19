"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  Heading2,
  List,
  Link as LinkIcon,
  Code,
  Eye,
  Edit,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Escribe tu contenido en Markdown...",
  minHeight = "400px",
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.querySelector(
      "textarea[data-markdown-editor]"
    ) as HTMLTextAreaElement;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const newText =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newText);

    // Restaurar focus y selección
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const toolbarButtons = [
    {
      icon: Bold,
      label: "Negrita",
      action: () => insertMarkdown("**", "**"),
    },
    {
      icon: Italic,
      label: "Cursiva",
      action: () => insertMarkdown("_", "_"),
    },
    {
      icon: Heading2,
      label: "Encabezado",
      action: () => insertMarkdown("## ", ""),
    },
    {
      icon: List,
      label: "Lista",
      action: () => insertMarkdown("- ", ""),
    },
    {
      icon: LinkIcon,
      label: "Enlace",
      action: () => insertMarkdown("[", "](url)"),
    },
    {
      icon: Code,
      label: "Código",
      action: () => insertMarkdown("`", "`"),
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Contenido
        </label>

        {/* Toggle Preview/Edit */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              !showPreview
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Edit size={14} />
            Editar
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              showPreview
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Eye size={14} />
            Vista Previa
          </button>
        </div>
      </div>

      {!showPreview ? (
        <>
          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border border-gray-300 rounded-t-lg">
            {toolbarButtons.map((button, index) => {
              const Icon = button.icon;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={button.action}
                  className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded transition-colors"
                  title={button.label}
                >
                  <Icon size={16} />
                </button>
              );
            })}
          </div>

          {/* Editor Textarea */}
          <textarea
            data-markdown-editor
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-300 border-t-0 rounded-b-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
            style={{ minHeight }}
          />

          {/* Helper */}
          <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-blue-600 font-bold text-xs">💡</div>
            <div className="text-xs text-blue-800 space-y-1">
              <p className="font-semibold">Guía rápida de Markdown:</p>
              <ul className="space-y-0.5 ml-4 list-disc">
                <li>**negrita** o __negrita__</li>
                <li>*cursiva* o _cursiva_</li>
                <li># Título grande, ## Título mediano, ### Título pequeño</li>
                <li>- Lista con viñetas</li>
                <li>[Texto del enlace](https://url.com)</li>
                <li>`código en línea`</li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Preview */}
          <div
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg bg-white prose prose-lg max-w-none"
            style={{ minHeight }}
          >
            {value ? (
              <ReactMarkdown>{value}</ReactMarkdown>
            ) : (
              <p className="text-gray-400 italic">
                No hay contenido para previsualizar
              </p>
            )}
          </div>
        </>
      )}

      {/* Character count */}
      <p className="text-xs text-gray-500 text-right">
        {value.length} caracteres
      </p>
    </div>
  );
}
