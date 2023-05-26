import { getAuthUser } from '@/lib/user'
import React from 'react'
import UserForm from './UserForm'
import { db } from '@/lib/db'
// import { StepOne } from "./steps/Course";
type Props = {}

async function page({}: Props) {
    const authUser = await getAuthUser()
    const courses = await db.course.findMany()
    const user = await db.user.findFirst({
        where: {
            email: authUser?.email,
        },
    })

    return (
        <div className="p-8">
            <h1 className="text-2xl capitalize">Welcome {user?.name}</h1>
            <h2 className="my-2">
                Your personalized experience is almost ready, just a few more
                steps
            </h2>
            <UserForm user={user} courses={courses} />
        </div>
    )
}

export default page
