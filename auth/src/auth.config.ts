import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import axios from "axios";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { setGlobalError } from "@/lib/error.lib";
import { setGlobalSuccess } from "@/lib/success.lib";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(Credentials) {
        try {
          const res = await axios.post(
            `${process.env.SERVER}/login`,
            Credentials
          );

          if (res.data && res.data.user) {
            setGlobalSuccess(res.data);
            return res.data.user;
          }

          return null;
        } catch (err: any) {
          setGlobalError(err.response.data);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
