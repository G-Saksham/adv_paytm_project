import {NextResponse} from "next/server"
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";

export async function GET()  {
    try {
        const session = await getServerSession(authOptions)
        if (session.user) {
            return NextResponse.json(session.user)
        }
        return NextResponse.json({
            msg: "You are not logged in"
        }, {
            status: 403
        })
    }
    catch (e) {
        return NextResponse.json({Error: e})
    }
}