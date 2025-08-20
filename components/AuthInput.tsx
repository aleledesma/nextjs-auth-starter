import { UseFormRegisterReturn, FieldError } from "react-hook-form"

type AuthInputProps = {
  id: string
  label: string
  register: UseFormRegisterReturn
  type: "email" | "password" | "text"
  placeholder?: string
  error: FieldError | undefined
}

export default function AuthInput({
  id,
  label,
  register,
  type,
  placeholder,
  error,
}: AuthInputProps) {
  return (
    <div>
      <label htmlFor="email" className="text-slate-900 font-semibold text-sm">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="mt-2 appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder={placeholder || label}
        {...register}
      />
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  )
}
