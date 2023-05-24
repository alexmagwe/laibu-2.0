import { Skeleton } from '@/components/ui/skeleton'
import { Content, Unit, UserModeratingUnit } from '@prisma/client'
import React from 'react'
import { FileItem } from './FileItem'
import { db } from '@/lib/db'
import EmptyContent from '@/components/ui/emptyContent'
import Link from 'next/link'

type Props = {
    unit:Unit 
}
export const revalidate = 3600
const getContent = async (unitId: string) => {
    const data = await db.content.findMany({
        where: {
            unit: {
                some: {
                    id: {
                        equals: unitId,
                    },
                },
            },
        },
    })
    return data
}
export default async function FileContent({ unit }: Props) {
    const files = await getContent(unit?.id!)

    return (
        <div className="flex bg-card border-2 rounded-md flex-col gap-2 p-4">
            <div>
                <h1 className="text-2xl text-muted-foreground">Content</h1>
                {files.length > 0 ? (
                    files.map((file) => <FileItem key={file.id} file={file} />)
                ) : (
                    <div className="py-8">
                        {unit && (
                            <EmptyContent caption="Content not available yet," />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export const ContentSkeleton = () => {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-18 w-full mb-4" />
            <Skeleton className="h-18 w-full " />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-18 w-full " />
            <Skeleton className="h-18 w-full " />
            <Skeleton className="h-18 w-full " />
            <Skeleton className="h-18 w-full " />
            <Skeleton className="h-18 w-full " />
            <Skeleton className="h-18 w-full " />
        </div>
    )
}
