import { Skeleton } from '@/components/ui/skeleton'
import { ContentVariant, Unit } from '@prisma/client'
import React, { cache } from 'react'
import { FileItem } from './FileItem'
import { db } from '@/lib/db'
import EmptyContent from '@/components/ui/emptyContent'
import { isModeratorForUnit } from '@/lib/user'
import AddContentDialog from './AddContentDialog'

type Props = {
    unit: Unit
    variant?: ContentVariant
    title?: string
    emptyText?: string
}
export const revalidate = 36000
const getContent = cache(async (unitId: string, variant: ContentVariant) => {
    if (!unitId) return []

    const data = await db.content.findMany({
        where: {
            type: variant,
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
})
export default async function FileContent({
    unit,
    title = 'Content',
    emptyText = 'No content',
    variant = ContentVariant.NOTES,
}: Props) {
    const files = await getContent(unit?.id!, variant)
    const isModerator = await isModeratorForUnit(unit.id)

    return (
        <div className="flex gap-4 border-2 rounded-md flex-col p-4">
            <div className="flex justify-between items-center w-full  ">
                <h1 className="text-2xl text-muted-foreground">{title}</h1>
                {isModerator && <AddContentDialog unit={unit} useIconTrigger />}
            </div>
            {files.length > 0 ? (
                files.map((file) => <FileItem key={file.id} file={file} />)
            ) : (
                <div className="py-8">
                    {unit && (
                        <div className="flex flex-col items-center gap-3">
                            <EmptyContent caption={emptyText} />
                            {isModerator && (
                                // <Link href={`/unit/${unit.code}/add`}>
                                //     <Button className="">
                                //         Add content
                                //     </Button>
                                // </Link>
                                <AddContentDialog unit={unit} />
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
