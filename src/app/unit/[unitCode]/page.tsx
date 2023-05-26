import React from 'react'
import FileContent, { ContentSkeleton } from './FileContent'
import { getUnit } from './layout'

type Props = {
    params: {
        unitCode: string
    }
}

async function page({ params }: Props) {
    const data = await getUnit(params.unitCode)

    return (
        <div className="p-4">
            <React.Suspense fallback={<ContentSkeleton />}>
                {/* @ts-expect-error Server Component */}
                <FileContent unit={data} />
            </React.Suspense>
        </div>
    )
}

export default page
