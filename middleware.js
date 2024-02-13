import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req, res, next) {
  const { pathname, origin } = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  console.log("see the session", session);
  if (pathname == "/checkout") {
    return NextResponse.redirect(`${origin}`);
  }
}
