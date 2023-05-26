import { isModeratorForCourse } from '@/lib/user'
import React from 'react'
import { redirect } from 'next/navigation'

type Props = {
    children: React.ReactNode
}

export default async function WithModerator({ children }: Props) {
    const isModerator = await isModeratorForCourse()
    if (!isModerator) {
        redirect('/dashboard')
    }

    return <div>{children}</div>
}
