import React from 'react'

export default function Section({ children, title }: { title: string, children: React.ReactNode }) {
    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="max-w-6xl w-full mx-auto grid gap-2">
                <h1 className="font-semibold text-3xl">{title}</h1>
            </div>
            <div className="grid gap-6 max-w-6xl w-full mx-auto">
                {children}
            </div>
        </main>
    )
}
