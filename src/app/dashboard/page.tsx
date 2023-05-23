import React from 'react'
import { db } from '@/lib/db'
import { getAuthUser, getUserFromDb } from '@/lib/getUser'
import { UserWithCourse } from '@/lib/validations/userInfoSchema'
import SemesterUnits, { UnitsSkeleton } from './overview/SemesterUnits'
type Props = {}

async function page({}: Props) {
    const user = await getUserFromDb()

    return (
        <div className="p-4">
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
                    <div className="h-6 bg-cyan-300/20 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="flex gap-4 items-center w-1/2 ">
                        <div className="h-36 flex-1 bg-cyan-300/20 dark:bg-gray-700 rounded"></div>
                        <div className="h-36 flex-1 bg-cyan-300/20 dark:bg-gray-700 rounded "></div>
                        <div className="h-36 flex-1 bg-cyan-300/20 dark:bg-gray-700 rounded "></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
