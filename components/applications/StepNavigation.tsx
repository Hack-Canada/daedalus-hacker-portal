"use client";

interface StepNavigationProps {
  steps: string[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function StepNavigation({
  steps,
  currentStep,
  onStepChange,
}: StepNavigationProps) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2 md:mb-12 xl:mb-16">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <button
            className={`relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-sm transition-all ${
              index === currentStep
                ? "border-primary/50 bg-primary text-white shadow-[0_0_15px_rgba(30,144,255,0.4)] ring-4 ring-primary/30"
                : "border-white/20 bg-white/5 text-white/50 hover:border-primary/30 hover:bg-primary/20 hover:text-white"
            }`}
            onClick={() => onStepChange(index)}
          >
            {index === steps.length - 1 ? "🎉" : index + 1}
          </button>
          {index < steps.length - 1 && (
            <div className="mx-2 h-1 w-4 rounded-full bg-primary/30" />
          )}
        </div>
      ))}
    </div>
  );
}
