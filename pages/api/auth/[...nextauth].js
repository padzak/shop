import NextAuth from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
// import InstagramProvider from "next-auth/providers/instagram";
// import PinterestProvider from "next-auth/providers/pinterest"
// import TwitterProvider from 'next-auth/providers/twitter';
// import GithubProvider from 'next-auth/providers/github';
// import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from './lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import db from '@/utils/db';

db.connectDb();

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // InstagramProvider({  // e-mail address is not returned by IG API
    //   clientId: process.env.INSTAGRAM_CLIENT_ID,
    //   clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
    // }),
    // PinterestProvider({
    //   clientId: process.env.PINTEREST_ID,
    //   clientSecret: process.env.PINTEREST_SECRET
    // }),
    // TwitterProvider({ // Visit Twitter developer portal to configure
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
    CredentialsProvider({ // TODO Investigate if this is a good way of authentication
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });
        if (user) {
          return SignInUser(user, password);
        } else {
          throw new Error("Provided incorrect sign in credentials");
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub);
      session.user.id = token.sub || user.id.toString();
      session.user.role = user.role || 'user';
      token.role = user.role || 'user';
      return session;
    }
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
});

const SignInUser = async (user, password) => {
  if (!user.password) {
    throw new Error("Password not set");
  }
  const passwordChallange = await bcrypt.compare(password, user.password);
  if (!passwordChallange) {
    throw new Error("Provided incorrect sign in credentials");
  }
  return user;
}