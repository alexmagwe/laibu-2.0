import React from 'react'
import { getUserFromDb } from '@/lib/user'

import WithModerator from '@/components/dashboard/WithModerator'
import { z } from 'zod'
import { getUnit } from '../layout'

type Props = z.infer<typeof routeContext>
const routeContext = z.object({
    params: z.object({ unitCode: z.string() }),
})

async function page(props: Props) {
    const {
        params: { unitCode },
    } = routeContext.parse(props)
    const data = await getUnit(unitCode)

    return (
        // @ts-expect-error Server Component
        <WithModerator unitId={decodeURI(data?.id)} unitCode={data?.code}>
            <div>
                <h1 className="text-2xl mb-4"></h1>
            </div>
        </WithModerator>
    )
}

export default page
