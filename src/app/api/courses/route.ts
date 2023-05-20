import { db } from '@/lib/db'
import { Course } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const data: Course[] = await db.course.findMany()
    return NextResponse.json(data)
}
//Todo add validation
export const POST = async (req: Request) => {
    const payload = await req.json()
    if (!payload?.name) NextResponse.json({ error: 'name is required' })
    const course = await db.course.create({
        data: payload,
    })
    NextResponse.json({ course })
}

export const PUT = async (req: Request) => {
    const payload = await req.json()
    if (!payload?.id) NextResponse.json({ error: 'id is required' })
    const course = await db.course.update({
        where: {
            id: payload.id,
        },
        data: payload,
    })
    NextResponse.json({ course })
}
export const DELETE = async (req: Request) => {
    const payload = await req.json()

    if (!payload.id) NextResponse.json({ error: 'id is required' })
    const course = await db.course.delete({
        where: {
            id: payload.id,
        },
    })
    NextResponse.json({ course })
}
