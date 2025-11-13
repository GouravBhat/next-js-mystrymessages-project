import { NextResponse, NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
// This function can be marked `async` if using `await` inside
export async function middleware(request) {

    const token=await getToken({req:request,secret: process.env.AUTH_SECRET})
    
    
    
    const url=request.nextUrl
    
    if(token && (url.pathname.startsWith("/sign-in")||url.pathname.startsWith("/signup")||url.pathname.startsWith("/verify")) ){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if(!token && url.pathname.startsWith("/dashboard") ){
         return NextResponse.redirect(new URL('/signup', request.url))
    }

    return NextResponse.next()
  
}
 
export const config = {
  matcher: ['/sign-in','/dashboard','/verify/:path*'],
}