import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(req) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET
  });

  const url = req.nextUrl;

  // If user is logged in → prevent visiting auth pages
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/verify"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If user is NOT logged in → block dashboard
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/signup", "/dashboard/:path*", "/verify/:path*"],
};
