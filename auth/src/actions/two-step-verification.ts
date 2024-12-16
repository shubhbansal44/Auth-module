"use server";

import * as z from "zod";
import axios from "axios";
import { TwoStepVerificationSchema } from "@/schemas/authSchema";

export const Authenticate = async (token: z.infer<typeof TwoStepVerificationSchema>) => {
  const validate = TwoStepVerificationSchema.safeParse(token);

  if (!validate.success) {
    return {
      error: "Invalid OTP!",
      success: "",
    };
  }

  try {
    const response = await axios.post(`${process.env.SERVER}/two-step-verification`, token);
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
