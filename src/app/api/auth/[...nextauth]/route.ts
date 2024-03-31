import nextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = { id: "hello", name: "jay", password: "dave" };
        if (!user || !user.password) return null;

        const passwordsMatch = user.password === credentials?.password;

        if (passwordsMatch) return user;
        return null;
      },
    }),
  ],
};

const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };
