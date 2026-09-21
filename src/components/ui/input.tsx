import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      containerClassName,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className={cn("w-full flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-slate-700 tracking-tight"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full h-9 rounded-md border bg-white px-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/25 focus-visible:border-teal-700",
              "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
              error
                ? "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-600"
                : "border-slate-200 hover:border-slate-300",
              leftIcon ? "pl-9" : "",
              rightIcon || error ? "pr-9" : "",
              className
            )}
            {...props}
          />
          {error ? (
            <div className="absolute right-3 flex items-center pointer-events-none text-red-600">
              <AlertCircle className="h-4 w-4" />
            </div>
          ) : rightIcon ? (
            <div className="absolute right-3 flex items-center text-slate-400">
              {rightIcon}
            </div>
          ) : null}
        </div>
        {error ? (
          <p className="text-xs font-medium text-red-600 flex items-center gap-1">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 leading-normal">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
