"use server";

import * as z from "zod";
import axios from "axios";
import { ResetPasswordSchema } from "@/schemas/authSchema";

interface ResetPasswordOptions {
  passwords: z.infer<typeof ResetPasswordSchema>;
  token: string | null;
}

export const ResetPassword = async (values: ResetPasswordOptions) => {
  const validate = ResetPasswordSchema.safeParse(values.passwords);

  if (!validate.success) {
    return {
      error: "Invalid credentials!",
      success: "",
    };
  }

  try {
    const response = await axios.post(
      `${process.env.SERVER}/reset-password`,
      values
    );
    const res = response.data;

    return { success: res.message, error: "" };
  } catch (err: any) {
    return {
      error:
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
      success: "",
    };
  }
};
