"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas/authSchema";
import axios from "axios";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validate = RegisterSchema.safeParse(values);

  if (!validate.success) {
    return {
      error: "Invalid credentials!",
      success: "",
    };
  }
  try {
    const response = await axios.post(`${process.env.SERVER}/signup`, values);
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
