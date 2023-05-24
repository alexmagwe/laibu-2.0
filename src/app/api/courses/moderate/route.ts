import { db } from '@/lib/db'
import { moderationSchema } from '@/lib/validations/moderate'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function POST(req: Request) {
    const user = await getServerSession()
    if (!user?.user?.id)
        return new Response(JSON.stringify({ error: 'unauthorized' }), {
            status: 401,
        })

    try {
        const data = moderationSchema.parse(req.body)
        db.userModeratingCourse.create({
            data: {
                courseId: data.courseId,
                userId: data.userId,
                phoneNumber: data.phoneNumber,
                year: data.year,
            },
        })
        return new Response(null, { status: 200 })
    } catch (e) {
        if (e instanceof z.ZodError) {
            return new Response(JSON.stringify({ error: e.issues }), {
                status: 422,
            })
        }
        return new Response(null, {
            status: 500,
        })
    }
}
