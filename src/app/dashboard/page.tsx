import React from 'react'
import { getUserFromDb } from '@/lib/user'
import SemesterUnits from './overview/SemesterUnits'
import ModerationBanner from '../../components/dashboard/ModeratorBanner'
import { UserType } from '@prisma/client'
import ModeratorUnits from './overview/ModeratorUnits'
import OnboardingDialog from './@onboarding/OnboardingDialog'
import { db } from '@/lib/db'
import OnboardingHeader from './@onboarding/OnboardingHeader'
type Props = {}
export const dynamic = 'force-dynamic'
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
            {user && user.type == UserType.STUDENT && user.courseId && (
                <ModerationBanner courseId={user?.courseId} />
            )}
            {/* <RecentSkeleton /> */}

            {user && user.type == UserType.STUDENT ? (
                <SemesterUnits user={user} />
            ) : user?.moderator ? (
                <ModeratorUnits moderatorId={user?.moderator?.id} />
            ) : (
                <div className="flex flex-col gap-4 items-center">
                    {/* <EmptyContent caption="Get started by choosing some units" /> */}
                    {user && <OnboardingHeader user={user} />}
                    <OnboardingDialog
                        isApproved={!!isApproved}
                        user={user}
                        courses={courses}
                    />
                </div>
            )}

            {/* <UnitsSkeleton /> */}
        </div>
    )
}

export default page
