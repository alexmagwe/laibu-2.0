import { isModeratorForUnit } from '@/lib/user'
import React from 'react'
import { redirect } from 'next/navigation'

type Props = {
    children: React.ReactNode
    unitCode: string
    unitId: string
}

export default async function WithModerator({
    children,
    unitCode,
    unitId,
}: Props) {
    const isModerator = await isModeratorForUnit(unitId)
    if (!isModerator) {
        redirect(`/unit/${unitCode}`)
    }

    return <div>{children}</div>
}
