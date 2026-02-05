"use client";

import { useEffect } from "react";

import { HackerApplicationsSelectData } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

import { APPLICATION_STEPS } from "../../config/application-form";
import { useHackerApplication } from "../../hooks/useHackerApplication";
import PageWrapper from "../PageWrapper";
import { Form } from "../ui/form";
import { BackgroundEducationStep } from "./BackgroundEducationStep";
import FormErrors from "./FormErrors";
import { FormNavigation } from "./FormNavigation";
import { GeneralInformationStep } from "./GeneralInformationStep";
import { ReviewDisplay } from "./ReviewDisplay";
import { ShortAnswersStep } from "./ShortAnswersStep";
import { StepContentWrapper } from "./StepContentWrapper";
import { StepNavigation } from "./StepNavigation";

type Props = {
  existingApplication: HackerApplicationsSelectData | null;
  userEmail: string;
};

export default function HackerApplicationForm({
  existingApplication,
  userEmail,
}: Props) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Browsers will show a confirmation message if the user tries to close the tab/window
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const {
    form,
    currentStep,
    setCurrentStep,
    isSaving,
    isSubmitting,
    validationErrors,
    formErrors,
    onSave,
    onSubmit,
  } = useHackerApplication(existingApplication);

  return (
    <PageWrapper className="flex h-full items-center bg-center">
      <div className="w-full">
        <StepNavigation
          steps={APPLICATION_STEPS}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
        <Form {...form}>
          <form
            className={cn("mx-auto w-full max-w-4xl", {
              "max-w-5xl": currentStep === 3,
            })}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="mb-6 space-y-8 md:mb-8">
              {currentStep === 0 && (
                <StepContentWrapper title="General Information">
                  <GeneralInformationStep
                    control={form.control}
                    watch={form.watch}
                    userEmail={userEmail}
                  />
                </StepContentWrapper>
              )}
              {currentStep === 1 && (
                <StepContentWrapper title="Your Background">
                  <BackgroundEducationStep
                    control={form.control}
                    watch={form.watch}
                  />
                </StepContentWrapper>
              )}
              {currentStep === 2 && (
                <StepContentWrapper
                  title="Short Answers"
                  className="space-y-0 md:space-y-0 xl:space-y-0"
                >
                  <p className="text-white/50 pt-1 pb-4 max-md:text-sm md:pt-2 md:pb-8">
                    Please answer both of the following questions. Max length of
                    2000 characters, minimum length of 32 characters for each
                    question.
                  </p>
                  <ShortAnswersStep control={form.control} />
                </StepContentWrapper>
              )}
              {currentStep === 3 && (
                <StepContentWrapper title="Review Application">
                  <ReviewDisplay form={form} />
                </StepContentWrapper>
              )}

              <FormErrors errors={formErrors} />
              <FormErrors saveErrors errors={validationErrors} />
            </div>

            <hr className="mb-6 border-white/10 md:mb-8" />

            <FormNavigation
              currentStep={currentStep}
              totalSteps={4}
              onPrevious={() => setCurrentStep((prev) => prev - 1)}
              onNext={() => setCurrentStep((prev) => prev + 1)}
              onSave={onSave}
              isSaving={isSaving}
              isSubmitting={isSubmitting}
            />
          </form>
        </Form>
      </div>
    </PageWrapper>
  );
}
