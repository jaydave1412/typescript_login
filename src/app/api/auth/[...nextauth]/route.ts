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
        console.log(credentials, "credentials");
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        try {
          const connection = await connect();
          const user = await userModel.findOne({ username: username });
          if (!user) {
            throw new Error("User not found", { cause: "auth" });
          }
          console.log(user.password);
          const isPasswordValid = await bcrypt.compare(user.password, password);
          console.log(isPasswordValid);
          if (isPasswordValid) {
            throw new Error("Invalid Password", { cause: "auth" });
          }
          return user;
        } catch (error: any) {
          if (error?.cause === "auth") {
            console.log(error, "error");
            throw error;
          }
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
    signIn: (data) => {
      console.log(data.user);
      return true;
    },
    jwt: async ({ token, user }) => {
      console.log(user, "user");
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
