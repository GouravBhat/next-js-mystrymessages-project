import { NextResponse, NextRequest } from 'next/server'
import {proxy} from 'next/server'

import { getToken } from "next-auth/jwt"
// This function can be marked `async` if using `await` inside
export default proxy(async (req) => {


    const token=await getToken({req:request,secret: process.env.AUTH_SECRET})
    
    
    
    const url=req.nextUrl
    
    if(token && (url.pathname.startsWith("/sign-in")||url.pathname.startsWith("/signup")||url.pathname.startsWith("/verify")) ){
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    if(!token && url.pathname.startsWith("/dashboard") ){
         return NextResponse.redirect(new URL('/signup', req.url))
    }

    return req;
  
})
 
export const config = {
  matcher: ['/sign-in','/dashboard','/verify/:path*'],
}