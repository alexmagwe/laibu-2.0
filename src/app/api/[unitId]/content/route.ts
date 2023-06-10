import { authOptions } from '@/lib/auth'
import { uploadedFileResolver } from '@/lib/content'
import { db } from '@/lib/db'
import { isModeratorForUnit } from '@/lib/user'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'
const routeContextSchema = z.object({
    params: z.object({
        unitId: z.string(),
    }),
})

export const GET = async (
    req: Request,
    context: z.infer<typeof routeContextSchema>
) => {
    const { params } = routeContextSchema.parse(context)
    try {
        const data = await db.content.findMany({
            where: {
                unit: {
                    some: {
                        id: {
                            equals: params.unitId,
                        },
                    },
                },
            },
        })
        return NextResponse.json({ data }, { status: 200 })
    } catch (e) {
        if (e instanceof z.ZodError) {
            console.log(e.issues)
            return NextResponse.json(
                { error: e.issues },
                {
                    status: 422,
                }
            )
        }
        console.log(e)
        return NextResponse.error()
    }
}

//add content data from post request to database
export const POST = async (
    req: Request,
    context: z.infer<typeof routeContextSchema>
) => {
    const { params } = routeContextSchema.parse(context)
    try {
        const session = await getServerSession(authOptions)
        const payload = await req.json()
        const files = uploadedFileResolver.parse(payload)
        const isModerator = await isModeratorForUnit(params.unitId)
        if (!session?.user || !isModerator)
            return new Response(JSON.stringify({ error: 'unauthorized' }), {
                status: 401,
            })
        const content = await db.unit.update({
            where: {
                id: params.unitId,
            },
            data: {
                content: {
                    create: files.data.map((file) => ({
                        name: file.name,
                        updatedName:
                            file.meta.name === file.name
                                ? null
                                : file.meta.name,
                        url: file.uploadURL,
                        type: file.meta.variant,
                        size: file.size,
                        ownerId: session.user.id,
                    })),
                },
            },
        })
        revalidateTag(`content:${params.unitId}`)
        return NextResponse.json({ content }, { status: 201 })
    } catch (e) {
        if (e instanceof z.ZodError) {
            console.log(e.issues)
            return NextResponse.json(
                { error: e.issues },
                {
                    status: 422,
                }
            )
        }
        console.log(e)
        return NextResponse.error()
    }
}
