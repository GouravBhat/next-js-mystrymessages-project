import { connectDB } from "@/lib/dbconnection"
import sendmail from "@/lib/emailverification"
import UserModel from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(request) {
    
    await connectDB()
    const{id}=await request.json()
    console.log(id);
    

    try {
        const user=await UserModel.findById(id)
       
        
        if(!user){
            return NextResponse.json({
                messages:"user cannot found sign in again"
            })
        }
        const verifycode = Math.floor(100000 + Math.random() * 900000).toString()
        const emailresult=sendmail(user.Email,verifycode)
        user.verifycode=verifycode
        user.verifycodeexpire=new Date(Date.now() + 60000)
        await user.save()
        return NextResponse.json({
            messages:emailresult.message
        })

    } catch (error) {
        return NextResponse.json({
            messages:"something went wrong "
        })
    }
}