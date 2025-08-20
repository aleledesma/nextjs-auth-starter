"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerFormSchema } from "@/zod/schemas/authSchemas"
import AuthInput from "@/components/AuthInput"

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Invalid registration")
        return
      }

      router.push("/login")
    } catch {
      setError("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <AuthInput
              id="name"
              label="Full name"
              register={register("name")}
              type="text"
              placeholder="John Doe"
              error={errors.name}
            />

            <AuthInput
              id="email"
              label="Email address"
              register={register("email")}
              type="email"
              placeholder="example@gmail.com"
              error={errors.email}
            />

            <AuthInput
              id="password"
              label="Password"
              register={register("password")}
              type="password"
              placeholder="********"
              error={errors.password}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center mt-3">{error}</div>
          )}

          <div>
            <button
              disabled={loading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link href="/login" className="text-blue-600 hover:underline">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
