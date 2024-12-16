import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(6, {
    message: "Password must contain at least 6 characters.",
  }),
  name: z.string().min(1, {
    message: "Name is required!",
  }),
  twoStepVerificationCheck: z.optional(z.boolean())
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
});

export const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, {
      message: "Password must contain at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must contain at least 6 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });


export const TwoStepVerificationSchema = z.object({
  token: z.string().min(6, {
    message: "OTP must be of 6 characters!",
  }).max(6, {
    message: "OTP must be of 6 characters!",
  }),
});