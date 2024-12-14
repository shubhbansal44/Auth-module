import Credentials from "next-auth/providers/credentials"
import { NextAuthConfig } from "next-auth"
import axios from 'axios';

export default { 
  providers: [Credentials({
    name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
    async authorize(Credentials) {
      try {
          const res = await axios.post(`${process.env.SERVER}/login`, Credentials);

          if (res.data && res.data.user) {
            return res.data.user;
          }

          return null;
      } catch (error) {
        console.error("Error during login: ", error);
        return null;
      }
    },
  })],
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthConfig;