import React from 'react'
import { getUserFromDb } from '@/lib/user'

import SemesterUnits, { UnitsSkeleton } from './overview/SemesterUnits'
import ModerationBanner from '../../components/dashboard/ModeratorBanner'
import { Skeleton } from '@/components/ui/skeleton'
type Props = {}

async function page({}: Props) {
    const user = await getUserFromDb()

    return (
        <div className="p-4">
            {/* @ts-expect-error Server Component */}
            {user && <ModerationBanner courseId={user?.courseId} />}
            <RecentSkeleton />
            <React.Suspense fallback={<UnitsSkeleton />}>
                {/* @ts-expect-error Server Component */}
                {user ? <SemesterUnits user={user} /> : null}
            </React.Suspense>
            {/* <UnitsSkeleton /> */}
        </div>
    )
}

export default page

export const RecentSkeleton = () => {
    return (
        <div className="p-4 ">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                    <Skeleton className="h-6  rounded w-1/4" />
                    <div className="flex gap-4 items-center w-1/2 ">
                        <Skeleton className="h-36 flex-1  rounded" />
                        <Skeleton className="h-36 flex-1  rounded " />
                        <Skeleton className="h-36 flex-1  rounded " />
                    </div>
                </div>
            </div>
        </div>
    )
}
