import nextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/lib/database/database";
import { User, userModel } from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        try {
          const connection = await connect();
          const user = await userModel.findOne({ username: username });
          if (!user) {
            return null;
          }
          const isPasswordValid = await bcrypt.compare(user.password, password);
          if (!isPasswordValid) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12, //12 hours
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log(user);
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.role = token.role;
      }
      console.log(session);
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };
