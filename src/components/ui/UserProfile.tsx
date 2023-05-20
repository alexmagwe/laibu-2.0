'use client'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { SessionProvider, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

type Props = {}

function UserSidebarProfile({}: Props) {
    const user = useSession().data?.user
    return (
        <>
            {user && user.image && (
                <Link
                    href="/profile"
                    className="mt-px w-full  hover:text-indigo-600 text-xs flex flex-wrap items-center justify-center gap-2"
                >
                    <Avatar className="my-2">
                        <AvatarImage
                            className="w-12 h-12 rounded-full"
                            src={user.image}
                        />
                    </Avatar>
                    <div className="hidden">
                        <p className=" text-sm font-semibold">
                            {user.name ?? ''}
                        </p>
                        View profile
                    </div>
                </Link>
            )}
        </>
    )
}

type ProviderProps = {}
export default function UserAvatar({}: ProviderProps) {
    return (
        <SessionProvider>
            <UserSidebarProfile />
        </SessionProvider>
    )
}
