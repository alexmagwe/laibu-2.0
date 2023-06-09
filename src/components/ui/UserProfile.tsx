'use client'
import { Avatar, AvatarImage } from './avatar'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from './dropdown-menu'
import { User2Icon } from 'lucide-react'
import { SessionProvider, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import LogoutButton from '../LogoutButton'

type Props = {}

function UserSidebarProfile({}: Props) {
    const user = useSession().data?.user
    return (
        <div className="">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {user && user.image ? (
                        <Avatar className="my-2 border-2">
                            <AvatarImage src={user.image} />
                        </Avatar>
                    ) : (
                        <User2Icon size={20} />
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="">
                    <DropdownMenuLabel>
                        {user?.name}
                        <p className="text-muted-foreground text-sm">
                            {user?.email}
                        </p>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="" />
                    <DropdownMenuItem>
                        <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                        <Link href="/settings">Subscription</Link>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem>
                        <LogoutButton />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
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
