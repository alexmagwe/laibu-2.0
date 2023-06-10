import { db } from '@/lib/db'
import { cache } from 'react'

export const getUnit = cache(async (unitCode: string) => {
    return await db.unit.findUnique({
        where: {
            code: decodeURI(unitCode),
        },
    })
})
