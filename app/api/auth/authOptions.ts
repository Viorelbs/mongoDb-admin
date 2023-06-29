import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS;

export const authOptions = {
  baseUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, user }: any) => {
      if (adminEmails!.includes(user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: "/signin",
  },
};
