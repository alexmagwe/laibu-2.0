import React from 'react'
import { getUserFromDb } from '@/lib/user'

import WithModerator from '@/components/dashboard/WithModerator'
import { z } from 'zod'
import { getUnit } from '../getUnit'

type Props = z.infer<typeof routeContext>
const routeContext = z.object({
    params: z.object({ unitCode: z.string() }),
})

async function page(props: Props) {
    const {
        params: { unitCode },
    } = routeContext.parse(props)
    const data = await getUnit(unitCode)
    if (!data) return <div>Unit not found</div>

    return (
        <WithModerator unitId={decodeURI(data.id)} unitCode={data.code}>
            <div>
                <h1 className="text-2xl mb-4"></h1>
            </div>
        </WithModerator>
    )
}

export default page
