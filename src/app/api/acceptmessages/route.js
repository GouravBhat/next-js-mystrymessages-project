import UserModel from "@/models/user";
import { connectDB } from "@/lib/dbconnection";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB()
    const session = await getServerSession(authoptions)
    
    
    const user = session?.user
    if (!user && !session) {
        return NextResponse.json({ message: "user not authorised login again" })
    }
    const userid = user?._id
    const { acceptmessages } = await request.json()
    
    
    try {
        const authoriseduser = await UserModel.findByIdAndUpdate(userid, { isacceptingmessages: acceptmessages })
        if (!authoriseduser) {
            return NextResponse.json({ message: "some problem to update user" })
        }
        return NextResponse.json({ message: 'user updated sucessfully' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "something wrong to update",



            

        },
            { status: 500 }
        )
    }
}
