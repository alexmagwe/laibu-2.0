import React from 'react'
import FileContent from '../FileContent'
import { ContentVariant } from '@prisma/client'
import { getUnit } from '../getUnit'
import EmptyContent from '@/components/ui/emptyContent'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
    params: {
        unitCode: string
    }
}

export default async function page({ params }: Props) {
    const unit = await getUnit(params.unitCode)

    return unit ? (
        <FileContent
            unit={unit}
            variant={ContentVariant.EXAM}
            title="Practice"
            emptyText="No practice Material, check back later"
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
