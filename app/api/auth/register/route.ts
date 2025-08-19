import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { z } from "zod"
import { registerFormSchema } from "@/zod/schemas/authSchemas"

type RegisterRequestBody = z.infer<typeof registerFormSchema>

export async function POST(request: Request) {
  try {
    const data: RegisterRequestBody | null = await request.json()
    if (!data?.email || !data?.password || !data?.name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    //find user by email
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    })

    const { password: _, ...user } = newUser
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
