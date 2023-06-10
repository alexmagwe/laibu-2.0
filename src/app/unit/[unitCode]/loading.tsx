import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

export default function loading({}: Props) {
    return (
        <div className="flex flex-col w-full border-2 gap-2 p-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-8 w-1/2" />
        </div>
    )
}
