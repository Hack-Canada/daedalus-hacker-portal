"use client";

import { Frown } from "lucide-react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type FormError =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | (Record<string, any> & Partial<{ type: string | number; message: string }>);

interface FormErrorsProps {
  errors: [string, FormError][];
  saveErrors?: boolean;
}

const formatErrorKey = (key: string) => {
  // Handle camelCase to Title Case conversion
  const result = key.replace(/([A-Z])/g, " $1");
  // Handle special cases
  if (key === "mlhCheckbox1") return "MLH Code of Conduct";
  if (key === "mlhCheckbox2") return "MLH Privacy Policy";
  if (key === "mlhCheckbox3") return "MLH Communication Consent";
  // Capitalize first letter of each word
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export default function FormErrors({ errors, saveErrors }: FormErrorsProps) {
  if (errors.length === 0) return null;

  return (
    <div
      className={`rounded-md border-2 ${
        saveErrors
          ? "border-warning/25 bg-warning/5"
          : "border-error/25 bg-error/5"
      } p-4 md:p-8`}
    >
      <h3
        className={`mb-4 font-rubik font-semibold ${
          saveErrors ? "text-warning" : "text-error"
        } md:text-lg`}
      >
        <Frown className="mr-1 inline-block size-5 -translate-y-0.5" />{" "}
        {saveErrors
          ? "Please fix the following errors before saving your application:"
          : "Please fix the following errors to complete your application:"}
      </h3>
      <div className="grid grid-cols-[max-content_1fr] items-center gap-x-4 gap-y-2 sm:gap-x-8 lg:gap-x-12">
        {errors.map(([key, error]) => (
          <>
            <p
              key={`${key}-label`}
              className={`text-xs font-medium ${
                saveErrors ? "text-warning" : "text-error"
              } md:text-sm`}
            >
              {formatErrorKey(key)}
            </p>
            <p
              key={`${key}-value`}
              className={`${saveErrors ? "text-warning" : "text-error"} max-md:text-sm`}
            >
              {typeof error?.message === "string"
                ? error.message
                : "Invalid value"}
            </p>
          </>
        ))}
      </div>
    </div>
  );
}
