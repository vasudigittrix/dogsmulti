import NextAuth from 'next-auth';
import User from '@/models/User';
import clientPromise from './lib/mongodb';
import bcrypt from 'bcrypt';
import db from '@/utils/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
db.connectDb();

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });
        if (user) {
          return SignInUser({ password, user });
        } else {
          throw new Error("This email does not exist.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) token.role = user.role;
        return token;
      } catch (error) {
        console.error('Error in jwt callback:', error);
        throw error; // Rethrow the error
      }
    },
    async session({ session, token }) {
      try {
      let user = await User.findById(token.sub);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub || user._id.toString(),
          role: user.role || "user",
          type: user.type || "null"
        },
      };
    }
    catch (error) {
      console.error('Error in session callback:', error);
      throw error;
    }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true, 
  },
};
export default NextAuth(authOptions);


const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error('Please enter your password.');
  }
  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error('Incorrect Credentials!');
  }
  return user;
};
