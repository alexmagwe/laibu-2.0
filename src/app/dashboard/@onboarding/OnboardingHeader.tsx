import React from 'react'
import { User } from '@prisma/client'

type Props = {
    user: User
}

export default function OnboardingHeader({ user }: Props) {
    return (
        <>
            <h1 className="text-2xl capitalize">Welcome {user?.name}</h1>
            <h2 className="my-2">
                Your personalized experience is almost ready, just a few more
                steps
            </h2>
        </>
    )
}
