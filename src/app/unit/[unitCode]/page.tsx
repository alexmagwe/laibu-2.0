import React from 'react'
import FileContent from './FileContent'
import { getUnit } from './getUnit'
import EmptyContent from '@/components/ui/emptyContent'

type Props = {
    params: {
        unitCode: string
    }
}
export const dynamic = 'force-dynamic'
async function page({ params }: Props) {
    const data = await getUnit(params.unitCode)

    return data ? (
        <FileContent
            unit={data}
            title="Course Material"
            emptyText="Course material not available, check back later"
        />
    ) : (
        <div className="flex flex-col gap-4 h-screen items-center justify-center">
            <EmptyContent
                caption="Unit not found"
                link={{
                    show: true,
                    link: '/',
                    text: 'Go Home',
                }}
            />
        </div>
    )
}

export default page
