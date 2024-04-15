import {PrismaClient} from "@payment-exchange/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import z from "zod"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import FacebookProvider from "next-auth/providers/facebook";

const prisma = new PrismaClient();

export const SigninSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Email", type: "text", placeholder: "Email"},
                password: {label: "Password", type: "password", placeholder: "Password"}
            },
            async authorize(credentials: any) : Promise<any> {
                try {
                    const parsedPayload = SigninSchema.safeParse({ 
                        email: credentials.username,
                        password: credentials.password
                    })

                    if(!parsedPayload.success) {
                        throw Error("Please check your credentials!")
                    }

                    const hashedPassword = await bcrypt.hash(parsedPayload.data.password,10);

                    const user = await prisma.user.findUnique({
                        where: parsedPayload.data
                    })

                    if(!user) {
                        throw Error("User not exist")
                    }

                    const userValidation = await bcrypt.compare(hashedPassword, user.password)

                    if(!userValidation) {
                        throw Error("Wrong passwrod, Please, try again!")
                    }

                    console.log(credentials)
                    return user;

                } catch (e) {
                    console.error(e);
                    return alert("Check console for the error") 
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