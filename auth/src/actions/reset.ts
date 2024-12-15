"use server";

import * as z from "zod";
import axios from "axios";
import { ResetSchema } from "@/schemas/authSchema";

export const Reset = async (email: z.infer<typeof ResetSchema>) => {
  const validate = ResetSchema.safeParse(email);

  if (!validate.success) {
    return {
      error: "Invalid credentials!",
      success: "",
    };
  }

  try {
    const response = await axios.post(`${process.env.SERVER}/reset`, email);
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
