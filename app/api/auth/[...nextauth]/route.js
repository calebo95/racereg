import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../lib/prisma.js";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            // Check if user with this email already exists in the database
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (existingUser && !existingUser[account.provider]) {
                // Link new OAuth account to existing user
                await prisma.account.create({
                    data: {
                        userId: existingUser.id,
                        provider: account.provider,
                        providerAccountId: account.providerAccountId,
                        type: account.type,
                        access_token: account.access_token,
                        expires_at: account.expires_at,
                        refresh_token: account.refresh_token,
                        token_type: account.token_type,
                        id_token: account.id_token,
                        scope: account.scope,
                        session_state: account.session_state,
                    },
                });
                return true;
            }

            return "/register"; // Redirect new users to registration
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
