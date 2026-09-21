import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface StepItem {
  id: string | number;
  title: string;
  description?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export function Stepper({
  steps,
  currentStepIndex,
  onStepClick,
  className,
}: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn("w-full", className)}>
      {/* Mobile progress label */}
      <div className="flex sm:hidden items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs">
        <span className="font-semibold text-slate-900">
          Step {currentStepIndex + 1}: {steps[currentStepIndex]?.title}
        </span>
        <span className="text-slate-500 font-mono text-[11px]">
          {currentStepIndex + 1} of {steps.length}
        </span>
      </div>

      <ol className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;
          const isClickable = Boolean(onStepClick && index <= currentStepIndex);

          return (
            <li
              key={step.id}
              className={cn(
                "relative flex-1",
                index !== steps.length - 1 ? "pr-3 sm:pr-6" : ""
              )}
            >
              <div className="flex items-center">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick?.(index)}
                  className={cn(
                    "flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold select-none transition-all border",
                    isCompleted
                      ? "bg-teal-700 text-white border-teal-700 hover:bg-teal-800 shadow-2xs cursor-pointer"
                      : isCurrent
                      ? "border-teal-700 bg-teal-50 text-teal-900 ring-2 ring-teal-700/20 font-bold"
                      : "border-slate-200 bg-white text-slate-400",
                    !isClickable && "cursor-default"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>

                <div className="ml-2.5 min-w-0 flex-1 hidden sm:block">
                  <p
                    className={cn(
                      "text-xs font-medium truncate tracking-tight",
                      isCurrent
                        ? "text-teal-950 font-semibold"
                        : isCompleted
                        ? "text-slate-800 font-medium"
                        : "text-slate-400"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-[11px] text-slate-400 truncate hidden lg:block">
                      {step.description}
                    </p>
                  )}
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      "h-[2px] w-full ml-3 flex-1 transition-colors rounded-full",
                      isCompleted ? "bg-teal-700" : "bg-slate-200"
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
