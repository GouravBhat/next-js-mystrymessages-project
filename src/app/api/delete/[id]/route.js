import UserModel from "@/models/user"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"

import { authoptions } from "../../auth/[...nextauth]/options";


export async function DELETE(request, { params }) {
    const {id} = await params
    

    const session = await getServerSession(authoptions)
 

    const user = session?.user
    if (!user && !session) {
        return NextResponse.json({ message: "user not authorised" })
    }


    try {
        const updateresult = await UserModel.updateOne({ _id: user?._id }, { $pull: { messages: { _id: id } } })
        if (updateresult.modifiedCount == 0) {
            return NextResponse.json({
                message: "message deleted or already delete "
            })
        }
        return NextResponse.json({
            message: "message deleted sucessfully"
        })

    } catch (error) {
        
        return NextResponse.json({
            message: "error in deleting message "
        })

    }
}