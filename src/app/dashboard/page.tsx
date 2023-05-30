import React from 'react'
import { getUserFromDb } from '@/lib/user'

import SemesterUnits, { UnitsSkeleton } from './overview/SemesterUnits'
import ModerationBanner from '../../components/dashboard/ModeratorBanner'
import { Skeleton } from '@/components/ui/skeleton'
import { UserType } from '@prisma/client'
import ModeratorUnits from './overview/ModeratorUnits'
import EmptyContent from '@/components/ui/emptyContent'
import ModeratorForm from './@onboarding/ModeratorForm'
import OnboardingDialog from './@onboarding/OnboardingDialog'
import { db } from '@/lib/db'
type Props = {}

async function page({}: Props) {
    const user = await getUserFromDb()
    const courses = await db.course.findMany()
    const isApproved = await db.approvedEmail.findFirst({
        where: {
            email: {
                equals: user?.email!,
            },
        },
    })

    return (
        <div className="p-4">
            {user && user.type == UserType.STUDENT && user.course && (
                //  @ts-expect-error Server Component
                <ModerationBanner courseId={user?.courseId} />
            )}
            {/* <RecentSkeleton /> */}
            <React.Suspense fallback={<UnitsSkeleton />}>
                {user && user.type == UserType.STUDENT ? (
                    //  @ts-expect-error Server Component
                    <SemesterUnits user={user} />
                ) : user?.moderator ? (
                    //   @ts-expect-error Server Component
                    <ModeratorUnits moderatorId={user?.moderator?.id} />
                ) : (
                    <div className="flex flex-col gap-4 items-center">
                        <EmptyContent caption="Get started by choosing some units" />
                        <OnboardingDialog
                            isApproved={!!isApproved}
                            user={user}
                            courses={courses}
                        />
                    </div>
                )}
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
