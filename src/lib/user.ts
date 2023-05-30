import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth'
import { db } from './db'
import 'server-only'
import { cache } from 'react'
export const getAuthUser = async () => {
    const session = await getServerSession(authOptions)
    return session?.user
}
export const getUserFromDb = cache(async () => {
    try {
        const session = await getServerSession(authOptions)
        if (session) {
            const user = await db.user.findUnique({
                where: { id: session?.user.id },
                include: {
                    course: true,
                    moderator: true,
                },
            })
            return user
        }
        return null
    } catch (e) {
        console.error(e)
        return null
    }
})
export const isModeratorForCourse = cache(async () => {
    const user = await getUserFromDb()
    if (user && user.courseId) {
        const isModerator = await db.userModeratingCourse.findFirst({
            where: {
                userId: user.id,
                courseId: user.courseId!,
            },
        })
        return !!isModerator
    }

    return false
})
export const isModeratorForUnit = cache(async (unitId: string) => {
    const user = await getUserFromDb()
    if (user && user.moderator) {
        const isModerator = await db.userModeratingUnit.findFirst({
            where: {
                moderatorId: user.moderator.id,
                unitId: unitId,
            },
        })
        return !!isModerator
    }

    return false
})
