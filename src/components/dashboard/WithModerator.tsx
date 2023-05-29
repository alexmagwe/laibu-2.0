import { isModeratorForUnit } from '@/lib/user'
import React from 'react'
import { redirect } from 'next/navigation'

type Props = {
    children: React.ReactNode
    unitId: string
}

export default async function WithModerator({ children, unitId }: Props) {
    const isModerator = await isModeratorForUnit(unitId)
    if (!isModerator) {
        redirect(`/unit/${unitId}`)
    }

    return <div>{children}</div>
}
