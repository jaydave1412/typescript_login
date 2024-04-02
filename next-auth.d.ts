import { JWT } from "next-auth/jwt";
import { User, DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** Sub is the key you want to use for user id in JWT */
    role?: string;
  }
}

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      /** The user's postal address. */
      role?: string;
    } & DefaultSession["user"];
  }
}
