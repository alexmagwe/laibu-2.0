import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { userUniversitySchema } from '@/lib/validations/userUniversitySchema'
import { getServerSession } from 'next-auth/next'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const routeContextSchema = z.object({
    params: z.object({
        userId: z.string(),
    }),
})

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user)
            return new Response(JSON.stringify({ error: 'unauthorized' }), {
                status: 401,
            })

        const user = await db.user.findUnique({
            where: { id: session.user.id },
            include: {
                course: true,
            },
        })
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (e) {
        return new Response(null, {
            status: 500,
        })
    }
}

export async function PUT(
    request: Request,
    context: z.infer<typeof routeContextSchema>
) {
    try {
        const { params } = routeContextSchema.parse(context)
        const session = await getServerSession(authOptions)
        if (!session?.user || params.userId !== (session.user.id ?? ''))
            return new Response(JSON.stringify({ error: 'unauthorized' }), {
                status: 401,
            })

        const body = await request.json()
        const payload = userUniversitySchema.parse(body)
        const user = await db.user.update({
            data: {
                semester: payload.semester,
                year: payload.year,
                isNew: false,
                course: {
                    connect: {
                        id: payload.course.id,
                    },
                },
            },
            where: { id: session.user.id },
        })
        revalidateTag('me')
        return new Response(JSON.stringify(user), { status: 201 })
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
