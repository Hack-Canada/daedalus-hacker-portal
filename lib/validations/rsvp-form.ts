import { z } from "zod";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

// T-shirt size options
export const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"] as const;

// Dietary restriction options
export const DIETARY_RESTRICTIONS = [
  "None",
  "Halal",
  "Vegetarian",
  "Vegan",
  "Kosher",
  "Gluten free",
  "Dairy free",
  "Allergies (please specify)",
  "Other (please specify)",
] as const;

export const RsvpFormSchema = z.object({
  emergencyContactName: z
    .string()
    .trim()
    .min(1, "Emergency contact name is required")
    .max(32, "Contact name must be at most 32 characters"),

  relationshipToParticipant: z
    .string()
    .trim()
    .min(1, "Relationship is required")
    .max(32, "Relationship must be at most 32 characters"),

  emergencyContactPhoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .refine(
      (value) => {
        return isValidPhoneNumber(value);
      },
      {
        message: "Please provide a valid phone number.",
      },
    )
    .transform((value) => {
      try {
        const phoneNumber = parsePhoneNumber(value);
        return phoneNumber ? phoneNumber.number : value;
      } catch {
        return value;
      }
    }),

  alternativePhoneNumber: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => {
        if (!value || value === "") return true;
        return isValidPhoneNumber(value);
      },
      {
        message: "Please provide a valid phone number.",
      },
    )
    .transform((value) => {
      if (!value || value === "") return value;
      try {
        const phoneNumber = parsePhoneNumber(value);
        return phoneNumber ? phoneNumber.number : value;
      } catch {
        return value;
      }
    }),

  dietaryRestrictions: z
    .object({
      value: z.enum(DIETARY_RESTRICTIONS, {
        required_error: "Please select your dietary restrictions",
        invalid_type_error: "Invalid dietary restriction selected",
      }),
      customValue: z
        .string()
        .trim()
        .max(100, "Additional details must be at most 100 characters")
        .optional(),
    })
    .refine(
      (data) => {
        if (
          data.value === "Allergies (please specify)" ||
          data.value === "Other (please specify)"
        ) {
          return data.customValue && data.customValue.trim().length > 0;
        }
        return true;
      },
      {
        message: "Please specify your dietary restrictions.",
        path: ["customValue"],
      },
    ),

  tshirtSize: z.enum(TSHIRT_SIZES, {
    required_error: "Please select a t-shirt size",
    invalid_type_error: "Invalid t-shirt size selected",
  }),

  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),

  mediaConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to media consent",
  }),
});

export type RsvpFormValues = z.infer<typeof RsvpFormSchema>;
