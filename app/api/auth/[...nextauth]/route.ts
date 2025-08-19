import NextAuth, { DefaultUser } from "next-auth"
// import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { authOptions } from "@/auth"

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string
    role: string
  }

  interface Session {
    user: { id: string; name: string; email: string; role: string }
    // user: { id: string };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
  }
}
