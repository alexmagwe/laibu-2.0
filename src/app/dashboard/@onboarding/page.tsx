import { getAuthUser, getUserFromDb } from '@/lib/user'
import React from 'react'
import { db } from '@/lib/db'
import OnboardingDialog from './OnboardingDialog'
import OnboardingHeader from './OnboardingHeader'
// import { StepOne } from "./steps/Course";
type Props = {}

async function page({}: Props) {
    const courses = await db.course.findMany()
    const user = await getUserFromDb()
    const isApproved = await db.approvedEmail.findFirst({
        where: {
            email: {
                equals: user?.email!,
            },
        },
    })

    return (
        <div className="p-8">
            {user && <OnboardingHeader user={user} />}
            <OnboardingDialog
                user={user}
                isApproved={!!isApproved}
                courses={courses}
            />
        </div>
    )
}

export default page
