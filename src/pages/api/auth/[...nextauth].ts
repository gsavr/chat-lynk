import NextAuth, { NextAuthOptions } from "next-auth";
//import Auth0Provider from "next-auth/providers/auth0";
import Auth0Provider from "./auth0";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) =>
      jsonwebtoken.sign(
        {
          ...token,
          iss: "nextauth",
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
        },
        secret
      ),
    decode: async ({ secret, token }) =>
      jsonwebtoken.verify(token!, secret) as JWT,
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        //console.log("profile", profile);
        token.username = profile?.login;
      }
      return token;
    },
    session({ session, token }) {
      // console.log("session in auth", session);
      //console.log("token in auth", token.sub);
      if (token.sub) {
        session.username = token?.sub;
        session.user.username = token?.sub;
      }
      return session;
    },
  },
  theme: {
    colorScheme: "dark",
    brandColor: "#000000",
    buttonText: "#000000",
  },
};

export default NextAuth(authOptions);
