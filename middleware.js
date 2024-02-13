import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req, res, next) {
  const { pathname, origin } = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  // Define protected routes
  if (pathname == "/checkout") {
    if (!session) return NextResponse.redirect(`${origin}`);
  }
  if (pathname == "/order") {
    if (!session) return NextResponse.redirect(`${origin}`);
  }
  if (pathname == "/profile") {
    if (!session) return NextResponse.redirect(`${origin}`);
  }
  if (pathname == "/admin") {
    if (!session) return NextResponse.redirect(`${origin}`);
  }
}
