import { z } from "zod";

export const EmailValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type EmailValidationType = z.infer<typeof EmailValidationSchema>;
