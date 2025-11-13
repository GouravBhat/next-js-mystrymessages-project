import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/dbconnection";
import UserModel from "@/models/user";





export const authoptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB()
                try {
                    const user = await UserModel.findOne({ Email: credentials.email })
                    

                    if (!user) {
                        throw new Error("user cannot find")
                    }
                    if (!user.isverified) {
                        throw new Error("verify first then login")
                    }
                    if (credentials.password !== user.password) {
                        throw new Error("password doesnt match")
                    }
                    return user;
                }
                catch (err) {
                    throw new Error(err)
                }

            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id
                token.isverified = user.isverified
                token.isacceptingmessages = user.isacceptingmessages
                token.username = user.username
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.isverified = token.isverified
                session.user.isacceptingmessages = token.isacceptingmessages
                session.user.username = token.username

                
            }

            return session
        }
    },
    pages: {
        signIn: "/sign-in",
    },

    session: {
        strategy: "jwt",
        maxAge:60*60

    },
    secret: process.env.AUTH_SECRET



}