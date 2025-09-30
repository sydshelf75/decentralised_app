// next-auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/config/db";
import { users } from "@/models/users";
import { eq } from "drizzle-orm";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Runs when user signs in
    async signIn({ user }: { user: any }) {
      let dbUser = await db.query.users.findFirst({
        where: eq(users.username, user.email!),
      });

      if (!dbUser) {
        const [newUser] = await db
          .insert(users)
          .values({
            username: user.email!,
            avatarUrl: user.image ?? null,
          })
          .returning();
        dbUser = newUser;
      }

      // Attach db user id to NextAuth "user"
      user.id = dbUser.id;
      return true;
    },

    // Put db user id into JWT
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.id = user.id; // store db id
      }
      return token;
    },

    // Expose db user id in session
    async session({ session, token }: { session: any, token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },

    async redirect({ baseUrl }: { baseUrl: any }) {
      return baseUrl + "/";
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
