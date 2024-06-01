import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function FormSkeleton() {
    return (
        <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg animate-pulse">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24 mx-auto" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24 mx-auto" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <Skeleton className="h-10 w-full rounded-md" />
            </div>
        </div>
    )
}
