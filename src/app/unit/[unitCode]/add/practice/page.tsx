import React from 'react'
import { getUserFromDb } from '@/lib/user'

type Props = {}

export default async function page({}: Props) {
    const user = await getUserFromDb()

    return (
        <div>
            <h1 className="text-2xl mb-4"></h1>
        </div>
    )
}
