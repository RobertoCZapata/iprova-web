import { forwardRef, TextareaHTMLAttributes } from "react";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium text-gray-700"
          htmlFor={props.id}
        >
          {label}
        </label>
        <textarea
          ref={ref}
          className={`block w-full px-4 py-2.5 border rounded-lg transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed resize-none ${
            error
              ? "border-red-500 focus:ring-red-200 focus:border-red-500"
              : "border-gray-300"
          } ${className}`}
          {...props}
        />
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
