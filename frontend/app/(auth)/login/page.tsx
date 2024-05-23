import axios from "axios"
import { Metadata } from "next"
import { Suspense } from "react"
import { UserType } from "@/types/auth"
import { Form } from "@/components/auth/form"
import { authenticate } from "@/lib/sessions"
import { extractErrorValues } from "@/lib/utils"
import BACKEND_URLS from "@/constants/backend-urls"
import { LinkButton } from "@/components/ui/link-button"
import FormSkeleton from "@/components/auth/form-skeleton"

export const metadata: Metadata = {
    title: "Login",
}

export default async function LoginPage() {
    return (
        <>
            <div className="absolute top-0 right-0 p-4 z-20">
                <LinkButton linkTo="/register" variant={'outline'}>
                    Sign up
                </LinkButton>
            </div>
            <div className="container relative  h-screen flex items-center justify-center">
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to login  your account
                            </p>
                        </div>
                        <Suspense fallback={<FormSkeleton />}>
                            <Form type="login" submitHandler={submitHandler} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}

const submitHandler = async (userData: { email: string, password: string }) => {
    "use server";
    try {
        const { data }: { data: UserType } = await axios.post(BACKEND_URLS.LOGIN, userData)
        try {
            await authenticate(data)
        } catch (error) {
            return { "error": true, "message": "Something goes wrong with our end." }
        } finally {
            return { "error": false, "message": "Done" }
        }
    } catch (error: any) {
        return { "error": true, "message": error?.response?.data?.detail ?? extractErrorValues(error?.response?.data) ?? error?.message }
    }
}