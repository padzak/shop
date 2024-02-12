import { NextResponse } from "next/server";

export async function middleware(req, res, next) {
    const { pathname, origin } = req.nextUrl;

    if (pathname == "/checkout")
    {
        return NextResponse.redirect(`${origin}`);
    }
}