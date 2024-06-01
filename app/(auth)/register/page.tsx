import axios from "axios"
import Link from "next/link"
import { Metadata } from "next"
import { UserType } from "@/types/auth"
import { Form } from "@/components/auth/form"
import { authenticate } from "@/lib/sessions"
import { extractErrorValues } from "@/lib/utils"
import BACKEND_URLS from "@/constants/backend-urls"
import { LinkButton } from "@/components/ui/link-button"

export const metadata: Metadata = {
    title: "Sign up",
}

export default function SignUp({ searchParams }: { searchParams: { redirect_back: string } }) {
    return (
        <>
            <div className="absolute top-0 right-0 p-4 z-20">
                <LinkButton linkTo={searchParams?.redirect_back ? `/login?redirect_back=${searchParams?.redirect_back}` : '/login'} variant={'outline'}>
                    Login
                </LinkButton>
            </div>
            <div className="container relative  h-screen flex items-center justify-center">
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p>
                        </div>
                        <Form type="register" submitHandler={submitHandler} redirectTo={searchParams?.redirect_back} />
                        <div className="sm:w-[400px] mx-auto">
                            <p className="px-8 text-center text-sm text-muted-foreground">
                                By clicking continue, you agree to our{" "}
                                <Link href="/terms" className="underline underline-offset-4 hover:text-primary" >
                                    Terms of Service
                                </Link>
                                {" "}and{" "}
                                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary" >
                                    Privacy Policy
                                </Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const submitHandler = async (userData: { email: string, username: string, password: string }) => {
    "use server";
    try {
        const { data }: { data: UserType } = await axios.post(BACKEND_URLS.SIGNUP, userData)
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