"use server";

import axios from "axios";

export const Verify = async (token: string | null) => {
  try {
    const response = await axios.post(`${process.env.SERVER}/verify`, { token })
    const res = response.data

    return { success: res.message, error: "" };
  } catch (err: any) {
      return {
        error: err.response?.data?.message || "An unexpected error occurred. Please try again later.",
        success: "",
      };
  }
}