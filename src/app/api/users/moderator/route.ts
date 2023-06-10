import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import {
    unitModerationSchema,
    unitsUpdateModerationSchema,
} from '@/lib/validations/moderationValidator'
import { UserType } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user)
            return NextResponse.json(
                { error: 'unauthorized' },
                {
                    status: 401,
                }
            )
        const body = await req.json()
        const payload = unitModerationSchema.parse(body)
        console.log(payload)
        const isApproved = await db.approvedEmail.findUnique({
            where: {
                email: session.user.email!,
            },
        })
        await db.moderator.upsert({
            where: {
                userId: session.user.id,
            },
            update: {
                approved: !!isApproved || false,
                unitsModerating: {
                    create: payload.map((unit) => ({
                        unitId: unit.unitId,
                    })),
                },
            },
            create: {
                userId: session.user.id,
                approved: !!isApproved || false,
                unitsModerating: {
                    create: payload.map((unit) => ({
                        unitId: unit.unitId,
                    })),
                },
            },
        })

        // const user = await db.user.update({
        //     where: {
        //         id: session.user.id,
        //     },
        //     data: {
        //         isNew: false,
        //         type: UserType.MODERATOR,
        //         moderator: {
        //             create: {
        //                 approved: !!isApproved || false,
        //             },
        //         },
        //     },
        //     include: {
        //         moderator: true,
        //     },
        // })
        // if (!user.moderator) return NextResponse.error()
        // await db.userModeratingUnit.createMany({
        //     data: payload.map((unit) => ({
        //         moderatorId: user.moderator!.id,
        //         unitId: unit.unitId,
        //     })),
        // })

        return NextResponse.json(
            { approved: !!isApproved },
            {
                status: 200,
            }
        )
    } catch (e) {
        if (e instanceof ZodError)
            return NextResponse.json(
                { error: e.issues },
                {
                    status: 422,
                }
            )
        console.log(e)
    }
    return NextResponse.error()
}
export async function PUT(req: Request) {
    //recieves an array of unit ids that the user wants to moderate or unmoderate and updates the database accordingly
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user)
            return NextResponse.json(
                { error: 'unauthorized' },
                {
                    status: 401,
                }
            )
        const body = await req.json()
        const payload = unitsUpdateModerationSchema.parse(body)
        if (payload.deleteUnits.length > 0) {
            await db.userModeratingUnit.deleteMany({
                where: {
                    moderatorId: payload.moderatorId,
                    unitId: {
                        in: payload.deleteUnits.map((unitId) => unitId),
                    },
                },
            })
        }
        await db.userModeratingUnit.createMany({
            data: payload.createUnits.map((unitId) => ({
                moderatorId: payload.moderatorId,
                unitId: unitId,
            })),
        })

        return new Response(null, { status: 200 })
    } catch (e) {
        if (e instanceof ZodError) {
            console.log(e.issues)
            return NextResponse.json(
                { error: e.issues },
                {
                    status: 422,
                }
            )
        }
        console.log(e)
    }
    return NextResponse.error()
}
