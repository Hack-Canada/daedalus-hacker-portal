import { z } from "zod";

const phoneRegex = /^[0-9-]+$/;

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
    .min(10, "Phone number must be at least 10 digits long")
    .max(21, "Phone number must be at most 21 digits long")
    .regex(phoneRegex, "Phone number must contain only digits and dashes (-)")
    .refine((val) => val.length >= 10, {
      message: "Phone number must be at least 10 digits long",
    }),

  alternativePhoneNumber: z
    .string()
    .trim()
    .max(21, "Phone number must be at most 21 digits long")
    .refine(
      (val) => val.length === 0 || (phoneRegex.test(val) && val.length >= 10),
      {
        message:
          "Phone number must be at least 10 digits long or left empty and contain only digits and dashes (-)",
      },
    )
    .optional(),

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
