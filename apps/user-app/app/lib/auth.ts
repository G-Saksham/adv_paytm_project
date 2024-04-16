import prisma from "@payment-exchange/db/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import z from "zod"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: {label: "Phone Number", type: "number", placeholder: "Enter your phone number"},
                password: {label: "Password", type: "password", placeholder: "Password"}
            },
            async authorize(credentials: Record<"phone" | "password", string> | undefined): Promise<any> {
                try {
                    // zod validation not working (find reason | always thorw error)

                    if (!credentials) {
                        return null
                    }
                    
                    // hashing password
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);

                    const existingUser = await prisma.user.findFirst({
                        where: {
                            number: credentials.phone
                        }
                    });

                    if(existingUser) {
                        const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                        if(passwordValidation) {
                            return existingUser
                        }
                        return null
                    }

                    const user = await prisma.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword,
                        }
                    })
                    return user;
                } catch (e) {
                    console.error(e)
                    return null
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
    ],
    secret: process.env.NXTAUTH_SECRET,
    callbacks: {
        session: ({ session, token }: any) => {
            console.log(session)
            if (session && session.user) {
                session.user.id = token.sub;
            }
            return session;
        }
    }
}