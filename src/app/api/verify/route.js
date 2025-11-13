
import UserModel from "@/models/user";

import { NextResponse } from "next/server";


export async function POST(request){
   const {username,otp}=await request.json()

   
   
   
  
   
   
   try {
      const user=await UserModel.findById(username)
      
      
      
      
   if(!user){
    return NextResponse.json({message:"sign-up first or check the id "})
   }
   else if(!otp.trim()){
      return NextResponse.json({
         message:"fill all fields"
      })
   }
   else if (user.verifycode===otp && new Date(user.verifycodeexpire)>new Date()) {
      user.isverified=true
      await user.save()
      return NextResponse.json({message:"user verified successfully"})
   }
   else{
   return NextResponse.json({message:"verify code expire or incorrect code"})
   }
  
   } catch (error) {
      
      return NextResponse.json(
         {
            message:"something went wrong",
            success:false
         },
         {
            status:500
         }
      )
      
   }
   
   
}