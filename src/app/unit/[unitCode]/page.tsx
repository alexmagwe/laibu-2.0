import React from 'react'
import FileContent, { ContentSkeleton } from './FileContent'
import { getUnit } from './layout'
import EmptyContent from '@/components/ui/emptyContent'

type Props = {
    params: {
        unitCode: string
    }
}

async function page({ params }: Props) {
    const data = await getUnit(params.unitCode)

    return (
        <div className="p-4 bg-background">
            <React.Suspense fallback={<ContentSkeleton />}>
                {data ? (
                    //  @ts-expect-error Server Component
                    <FileContent unit={data} />
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
                )}
            </React.Suspense>
        </div>
    )
}

export default page
