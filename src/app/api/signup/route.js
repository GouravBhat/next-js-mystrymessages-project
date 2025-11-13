import UserModel from "@/models/user";
import sendmail from "@/lib/emailverification";
import { connectDB } from "@/lib/dbconnection";

import { NextResponse } from "next/server";
import { signupSchema } from "@/Schemas/signupSchema";



export async function POST(request) {
     await connectDB()

    try {
        const body = await request.json()
      
        
        const result = signupSchema.safeParse(body);
    
        
         
        if (!result.success) {
            return NextResponse.json(result.error.issues[0])
        }
        const {username,email,password}=result.data
        const verifieduser = await UserModel.findOne({ username,isverified:true})
        if (verifieduser) {
            return NextResponse.json({ message: "username is already taken" })
        }

        const verifycode = Math.floor(100000 + Math.random() * 900000).toString()
        const existuserbyemail = await UserModel.findOne({ Email:email })
        if (existuserbyemail) {
            if (existuserbyemail.isverified) {
                return NextResponse.json(
                    {
                        message: "user exist "
                    }
                )

            } else {
                existuserbyemail.username=username
                existuserbyemail.Email=email
                existuserbyemail.password = password,
                    existuserbyemail.verifycode = verifycode,
                    existuserbyemail.verifycodeexpire = new Date(Date.now() + 60000);
                    await existuserbyemail.save()
                    const emailresult=sendmail( email, verifycode);
                    
                    
                    return NextResponse.json({message:"user created another time with new username",userId:existuserbyemail._id,emailresult:emailresult.message


                    })
            }

        }
        else {
             const expirydate = new Date(Date.now() + 60000);
            const newuser = new UserModel({
                username,
                Email: email,
                password,
                verifycode: verifycode,
                verifycodeexpire: expirydate,
                isverified: false,
                isacceptingmessages: true,
                messages: []
            })
            await newuser.save()
            const emailresult= sendmail(email,verifycode) 
            console.log(emailresult);
            
         
             
            return NextResponse.json({message:"user created",userId:newuser._id,emailresult:emailresult.message})
            
        }


    } catch (error) {
       
        
        
        return NextResponse.json({ success: false, message: "error in signup" })

    }

}