import CardSkeleton from '@/components/lobby/skeletons/lobby'
import React from 'react'

export default function Loading() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                <CardSkeleton type="leader-board"/>
                <CardSkeleton type='games'/>
                <CardSkeleton  type='search'/>
            </div>
        </main>
    )
}
