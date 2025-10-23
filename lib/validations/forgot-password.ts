import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email cannot exceed 255 characters" }),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
