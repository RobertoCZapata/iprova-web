import { forwardRef, InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: LucideIcon;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon: Icon, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium text-gray-700"
          htmlFor={props.id}
        >
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Icon size={20} />
            </div>
          )}
          <input
            ref={ref}
            className={`block w-full ${
              Icon ? "pl-10" : "pl-4"
            } pr-4 py-2.5 border rounded-lg transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed ${
              error
                ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300"
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
