import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import {
    unitModerationSchema,
    unitsUpdateModerationSchema,
} from '@/lib/validations/moderationValidator'
import { UserType } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { ZodError } from 'zod'

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user)
            return new Response(JSON.stringify({ error: 'unauthorized' }), {
                status: 401,
            })
        const body = await req.json()
        const payload = unitModerationSchema.parse(body)
        const isApproved = await db.approvedEmail.findUnique({
            where: {
                email: session.user.email!,
            },
        })
        const user = await db.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                isNew: false,
                type: UserType.LECTURER,
                moderator: {
                    create: {
                        approved: !!isApproved || false,
                        unitsModerating: {
                            createMany: {
                                data: [
                                    ...payload.map((unit) => ({
                                        unitId: unit.id,
                                    })),
                                ],
                            },
                        },
                    },
                },
            },
        })
        // const user = await db.moderator.create({
        //     data: {
        //         account: {
        //             connect: {
        //                 id: session.user.id,
        //             },
        //         },
        //         approved: !!isApproved || false,
        //         unitsModerating: {
        //             createMany: {
        //                 data: [...payload.map((unit) => ({ unitId: unit.id }))],
        //             },
        //         },
        //     },
        // })

        return new Response(JSON.stringify({ approved: !!isApproved }), {
            status: 200,
        })
    } catch (e) {
        if (e instanceof ZodError)
            return new Response(JSON.stringify({ error: e.issues }), {
                status: 422,
            })
        console.log(e)
    }
    return new Response(null, { status: 500 })
}
export async function PUT(req: Request) {
    //recieves an array of unit ids that the user wants to moderate or unmoderate and updates the database accordingly
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user)
            return new Response(JSON.stringify({ error: 'unauthorized' }), {
                status: 401,
            })
        const body = await req.json()
        const payload = unitsUpdateModerationSchema.parse(body)
        const units = await db.userModeratingUnit.deleteMany({
            where: {
                moderatorId: payload.moderatorId,
                unitId: {
                    in: payload.deleteUnits.map((unitId) => unitId),
                },
            },
        })
        const units2 = await db.userModeratingUnit.createMany({
            data: payload.createUnits.map((unitId) => ({
                moderatorId: payload.moderatorId,
                unitId: unitId,
            })),
        })

        return new Response(null, { status: 200 })
    } catch (e) {
        if (e instanceof ZodError) {
            console.log(e.issues)
            return new Response(JSON.stringify({ error: e.issues }), {
                status: 422,
            })
        }
        console.log(e)
    }
    return new Response(null, { status: 500 })
}
