import { connectDB } from "@/lib/dbconnection";
import UserModel, { Message } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request){
    await connectDB()
    const {id,content}=await request.json()
   
    
   
try {
    const user=await UserModel.findById(id)
    if (!user) {
        return NextResponse.json({message:"user not verified/not present"})
    }
    if(!user.isacceptingmessages){
        return NextResponse.json({message:"user not accept messages"})
    }
    const newuser={content,CreatedAt:new Date()}
    user.messages.push(newuser)
    await user.save()
    return NextResponse.json({message:"message send successfully"})

} catch (error) {
   

    return NextResponse.json({message:"internal server error to send message"},{status:500})
}
}