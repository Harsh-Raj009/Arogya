import * as React from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, label, helperText, error, containerClassName, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className={cn("w-full flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            id={inputId}
            type="date"
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full h-9 rounded-md border bg-white px-3 text-sm text-slate-900 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:border-teal-700",
              "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
              error
                ? "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-600"
                : "border-slate-300 hover:border-slate-400",
              className
            )}
            {...props}
          />
          <div className="absolute right-3 pointer-events-none text-slate-400">
            <Calendar className="h-4 w-4" />
          </div>
        </div>
        {error ? (
          <p className="text-xs font-medium text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

DateInput.displayName = "DateInput";

