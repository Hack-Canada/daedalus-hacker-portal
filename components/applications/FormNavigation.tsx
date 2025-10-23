"use client";

import {
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Save,
  ThumbsUp,
} from "lucide-react";

import { Button } from "../ui/button";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  isSaving?: boolean;
  isSubmitting?: boolean;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSave,
  isSaving = false,
  isSubmitting = false,
}: FormNavigationProps) {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row">
      <div className="flex w-full gap-4 sm:justify-between">
        <Button
          variant="outline"
          type="button"
          disabled={isFirstStep}
          onClick={onPrevious}
          className="gap-2 px-8 max-sm:w-full md:text-base"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <div className="mt-2 w-full text-center text-sm text-muted-foreground max-sm:hidden">
          Step {currentStep + 1} of {totalSteps}
        </div>
        <Button
          variant="outline"
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="w-full gap-2 px-8 sm:w-auto sm:shrink-0 md:text-base"
        >
          <Save className="size-4" />
          {isSaving ? (
            "Saving..."
          ) : (
            <>
              <span>
                Save<span className="max-md:hidden"> for Later</span>
              </span>
            </>
          )}
        </Button>
      </div>
      <div className="flex w-full gap-4 sm:w-auto">
        {isLastStep ? (
          <Button
            variant="primary"
            type="submit"
            className="gap-2 px-10 hover:-translate-y-1 max-sm:w-full md:text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ThumbsUp className="size-4" />
            )}
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        ) : (
          <Button
            variant="outline"
            type="button"
            disabled={isLastStep}
            onClick={(e) => {
              e.preventDefault();
              if (currentStep < 3) {
                onNext();
              }
            }}
            className="gap-2 px-8 max-sm:w-full md:text-base"
          >
            Next
            <ChevronRight className="size-4" />
          </Button>
        )}
      </div>

      <div className="mt-2 w-full text-center text-sm text-muted-foreground sm:hidden">
        Step {currentStep + 1} of {totalSteps}
      </div>
    </div>
  );
}
