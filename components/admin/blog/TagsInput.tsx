"use client";

import { useState, KeyboardEvent } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";

interface TagsInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export function TagsInput({
  tags,
  onChange,
  placeholder = "Agregar tag y presionar Enter",
  maxTags = 10,
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim().toLowerCase();

    // Validaciones
    if (!trimmedValue) return;
    if (tags.includes(trimmedValue)) {
      toast.error("Este tag ya existe");
      return;
    }
    if (tags.length >= maxTags) {
      toast.error(`Máximo ${maxTags} tags permitidos`);
      return;
    }

    // Agregar tag
    onChange([...tags, trimmedValue]);
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      {/* Input */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        maxLength={50}
      />

      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                aria-label={`Eliminar tag ${tag}`}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Counter */}
      <p className="text-xs text-gray-500">
        {tags.length} / {maxTags} tags
      </p>
    </div>
  );
}
