import { connectDB } from "@/lib/dbconnection";
import UserModel from "@/models/user";
import { userschema } from "@/Schemas/signupSchema";
import { NextResponse } from "next/server";

import z from "zod";

export async function GET(request) {
    const usernamequeryschema = z.object({
        username: userschema
    })
    await connectDB()
    try {
        const { searchParams }= new URL(request.url)
        const queryparams={
            username:searchParams.get('username')
        }
        
        const result=usernamequeryschema.safeParse(queryparams)
        if (!result.success) {
             return NextResponse.json(result.error.issues[0])
        }
        const {username}=result.data
        let user=await UserModel.findOne({username,isverified:true})
        if(user){
             return NextResponse.json({message:"username is already taken"})
        }
         return NextResponse.json({message:"username is unique"})
    } catch (error) {
        
        return NextResponse.json({
            success:false,
            message:"username checking problem",
            
        },
        {status:500}
    )
        
    }
}

