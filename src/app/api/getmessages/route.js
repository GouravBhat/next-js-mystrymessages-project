import UserModel from "@/models/user";
import { connectDB } from "@/lib/dbconnection";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


export async function GET(request) {
    await connectDB()
    const session = await getServerSession(authoptions)
   
    const user = session?.user
    if (!user && !session) {
        return NextResponse.json({ message: "user not authorised login again" })
    }

    const userId = new mongoose.Types.ObjectId(user?._id)
   


    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.CreatedAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ])
        if (!user || user.length === 0 ) {
            return NextResponse.json({ message: "no messages found" })

        }
        return NextResponse.json({
            allmessage: user[0].messages,
            success: true
        })

    } catch (error) {
        
        return NextResponse.json({ message: "something wrong during get mesages" }, { status: 500 })

    }
}