"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas/authSchema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validate = LoginSchema.safeParse(values);

  if (!validate.success) {
    return {
      error: "Invalid credentials!",
      success: "",
    };
  }
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Login successful", error: "" };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return {
            error: "An unexpected error occurred. Please try again later.",
            success: "",
          };
      }
    }

    throw err;
  }
};