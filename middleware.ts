export { withAuth } from "next-auth/middleware"
import withAuth from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    //routes only accessible to non-authenticated users
    if (
      (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
      token
    ) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // routes only accessible to authenticated users
        if (pathname.startsWith("/dashboard")) {
          return !!token
        }
        // all other routes are accessible to both authenticated and non-authenticated users
        return true
      },
    },
  }
)

export const config = { matcher: ["/dashboard/:path*", "/login", "/register"] }
