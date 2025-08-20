"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { loginFormSchema } from "@/zod/schemas/authSchemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import AuthInput from "@/components/AuthInput"

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      setLoading(true)
      setError(null)
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      })

      if (response?.error) {
        setError(response.error)
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch {
      setError("An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
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
            <div className="text-red-500 text-sm mt-3 text-center">{error}</div>
          )}

          <div>
            <button
              disabled={loading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link href="/register" className="text-blue-600 hover:underline">
            No account? Register.
          </Link>
        </div>
      </div>
    </div>
  )
}
