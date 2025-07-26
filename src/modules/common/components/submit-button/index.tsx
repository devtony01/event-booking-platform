"use client"

import { Button } from "@design/ui/src"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
    children,
    variant = "primary",
    className,
    disabled,
    type = "submit",
    'data-testid': dataTestId
}: {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "transparent" | "danger" | null
    className?: string
    disabled?: boolean
    type?: "submit" | "button" | "reset"
    'data-testid'?: string
}) {
    const { pending } = useFormStatus()

    return (
        <Button
            className={className}
            type={type}
            disabled={disabled || pending}
            isLoading={pending}
            data-testid={dataTestId}
        >
            {children}
        </Button>
    )
}
