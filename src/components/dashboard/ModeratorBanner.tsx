import React from 'react'
import { db } from '@/lib/db'
import { Unit } from '@prisma/client'

import Moderate from '../moderation/Moderate'
import { getUserFromDb } from '@/lib/user'

export type BannerProps = {
    courseId: string
}
export const getModerators = async (courseId: string) => {
    const data = await db.userModeratingCourse.findMany({
        where: {
            courseId: {
                equals: courseId,
            },
        },
    })
    return data
}
export default async function ModeratorBanner({ courseId }: BannerProps) {
    const data = await getModerators(courseId)
    const user = await getUserFromDb()
    if (data.length > 0) return null
    return (
        <div className="bg-purple-600 rounded-md text-slate-100 border-2 mb-6 p-4">
            <Moderate user={user} />
        </div>
    )
}
