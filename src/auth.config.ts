import { type NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";

export const authConfig = {
  basePath: "/api/nextauth",
  providers: [
    credentials({
      name: "credentials",
      async authorize(credentials) {
        return { email: credentials.email as string };
      },
    }),
  ],
} satisfies NextAuthConfig;
