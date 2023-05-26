import { db } from '@/lib/db'
import { moderationSchema } from '@/lib/validations/moderationValidator'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export const becomeModerator = async (
    data: z.infer<typeof moderationSchema>
) => {
    const user = await getServerSession()
    if (!user?.user?.id) return { error: 'unauthorized' }
    try {
        db.userModeratingCourse.create({
            data: {
                courseId: data.courseId,
                userId: data.userId,
                phoneNumber: data.phoneNumber,
                year: data.year,
            },
        })
        return {
            message:
                '🎉 You are now the moderator for this course, with great power comes great responsibility',
        }
    } catch (e) {
        return { error: e as string }
    }
}
