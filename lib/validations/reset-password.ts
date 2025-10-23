import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(64, { message: "Password cannot exceed 64 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string({ required_error: "Please confirm your password" })
      .trim(),
    token: z
      .string({ required_error: "Reset token is required" })
      .trim()
      .uuid(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
