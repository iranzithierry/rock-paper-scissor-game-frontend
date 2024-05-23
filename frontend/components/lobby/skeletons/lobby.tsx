import { Skeleton } from '@/components/ui/skeleton'

type SkeletonTypes = "games" | "leader-board" | "search"
export default async function CardSkeleton({ type = "games" }: { type?: SkeletonTypes }) {
    return (
        <div className='rounded-xl border bg-card text-card-foreground shadow w-full overflow-x-auto'>
            <div className='p-2 sm:p-6 flex flex-col space-y-1.5'>
                <div className="flex justify-between">
                    <Skeleton className="h-5 w-[20%] rounded-md" />
                    {type == "leader-board" && <Skeleton className="h-5 w-[20%] rounded-md" />}
                </div>
                <Skeleton className="h-5 w-[70%] rounded-md" />
            </div>
            <div className='p-2 sm:p-6 space-y-4'>
                <div className='flex justify-between space-x-1'>
                    <Skeleton className="h-5 w-full rounded-md" />
                    <Skeleton className="h-5 w-full rounded-md" />
                    <Skeleton className="h-5 w-full rounded-md" />
                    <Skeleton className="h-5 w-full rounded-md" />
                </div>
                <Skeleton className="h-1 w-full rounded-md" />
                <div className='flex justify-between space-x-1'>
                    <Skeleton className="h-5 w-full rounded-md" />
                    <Skeleton className="h-5 w-full rounded-md" />
                    <Skeleton className="h-5 w-[50%] rounded-md" />
                    <Skeleton className="h-5 w-[50%] rounded-md" />
                </div>
            </div>
            {type == "games" &&
                <div className='flex items-center p-6 pt-0'>
                    <Skeleton className="h-5 w-[25%] rounded-md ml-auto" />
                </div>}
        </div>
    )
}