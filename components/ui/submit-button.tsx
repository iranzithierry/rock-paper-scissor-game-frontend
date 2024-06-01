import { VariantProps } from "class-variance-authority"
import { ButtonProps, buttonVariants } from "./button"
import React from "react"
import { cn } from "@/lib/utils"
import { SpinnerIcon } from "./icons"
import nlp from 'compromise'

export interface SubmitButtonProps
    extends ButtonProps {
    submitting?: boolean,
    label?: string
}

export default function SubmitButton({ className, label = "Submit", variant, size, submitting = false, ...props }: SubmitButtonProps) {
    return (
        <button disabled={submitting} className={cn(buttonVariants({ variant, size, className }))}>
            {submitting && (<SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />)}
            {submitting  ? nlp(label).verbs().toGerund().out().split(' ')[1] : label}
        </button>
    )
}