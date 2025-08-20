import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  console.log(session?.user)
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <h1 className="text-5xl font-semibold">Dashboard</h1>
      <p className="text-base">
        Your role is: <b>{session?.user.role}</b>
      </p>
    </div>
  )
}
