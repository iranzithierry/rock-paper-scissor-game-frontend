"use client";
import { SpinnerIcon } from '@/components/ui/icons'
import React, { useEffect } from 'react'

export default function Logout({ logout }: { logout: () => Promise<void> }) {
    useEffect(() => {
        logout();
    })
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex items-center space-x-2">
                <SpinnerIcon className="h-5 w-5 animate-spin stroke-zinc-800" />
                <p className="text-base font-medium">Logging out...</p>
            </div>
        </div>
    )
}
