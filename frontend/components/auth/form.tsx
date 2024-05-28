"use client"

import * as React from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { SpinnerIcon } from "../ui/icons"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

interface FormProps extends React.HTMLAttributes<HTMLDivElement> { type?: string, submitHandler: Function, redirectTo?: string | null } { }

export function Form({ className, type = "register", submitHandler, redirectTo, ...props }: FormProps) {
  const router = useRouter()
  const params = useSearchParams();

  const [submitting, setSubmitting] = React.useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data: any) => {
    setSubmitting(true)
    const response = await submitHandler(data)
    if (response) {
      const { error, message }: { error?: string, message?: string } = response
      if (message == "Done") {
        if (redirectTo) return window.location.replace(redirectTo)
        return window.location.replace("/lobby")
      }
      error ? toast.error(message) : toast.success(message)
    } setSubmitting(false)
  }
  const isError = (value: any | null) => value ? true : false

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {type != "login" && (
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input invalid={isError(errors.email?.message)} id="email" placeholder="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={submitting}
                {...register('email',
                  { required: { value: true, message: "Email is required" }, pattern: { value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Email you provided is invalid" } })
                }
              />
              {errors.email && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.email?.message as string | null}</span>}
            </div>
          )}
          <div className="grid gap-1">
            <Label htmlFor="username">Username</Label>
            <Input invalid={isError(errors.name?.message)} id="username" placeholder="username" autoCapitalize="none" autoComplete="username" autoCorrect="off" disabled={submitting}
              {...register('username',
                { required: { value: true, message: "Username is required" } })
              }
            /> {errors.username && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.username?.message as string | null}</span>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input invalid={isError(errors.password?.message)} id="password" type="password" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" autoComplete="new-password" disabled={submitting}
              {...register('password',
                { required: { value: true, message: "Password is required" } })
              }
            /> {errors.password && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.password?.message as string | null}</span>}
          </div>
          <Button disabled={submitting}>
            {submitting && (<SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />)}
            {type == "register" ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </form>
    </div>
  )
}
