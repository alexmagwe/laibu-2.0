import React from 'react'
import { db } from '@/lib/db'
import { Unit } from '@prisma/client'

import Moderate from './Moderate'

export type BannerProps = {
    unit: Unit
}
export const getModerators = async (unitId: string) => {
    const data = await db.userModeratingUnit.findMany({
        where: {
            unitId: {
                equals: unitId,
            },
        },
    })
    return data
}
export async function Banner({ unit }: BannerProps) {
    const data = await getModerators(unit?.id!)
    if (data.length > 0) return null
    return (
        <div className="bg-purple-600 rounded-md text-slate-100 border-2 mb-6 p-4">
            <Moderate unit={unit} moderators={data} />
        </div>
    )
}
