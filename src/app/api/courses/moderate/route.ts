import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { moderationSchema } from '@/lib/validations/moderationValidator'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function POST(req: Request) {
    const user = await getServerSession(authOptions)
    if (!user?.user?.id)
        return new Response(null, {
            status: 401,
        })

    try {
        const payload = await req.json()
        const data = moderationSchema.parse(payload)
        await db.userModeratingCourse.create({
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
            return new Response(JSON.stringify({ error: e.message }), {
                status: 422,
            })
        }
        console.log(e)
        return new Response(null, {
            status: 500,
        })
    }
}
