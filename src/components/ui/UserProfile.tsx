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
import LogoutButton from '../LogoutButton'

type Props = {}

function UserSidebarProfile({}: Props) {
    const user = useSession().data?.user
    console.log(user)
    return (
        <div className="">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {user && user.image ? (
                        <Avatar className="my-2">
                            <AvatarImage src={user.image} />
                        </Avatar>
                    ) : (
                        <User2Icon size={30} />
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="dark:text-slate-600" />
                    <DropdownMenuItem>
                        <Link href="/billing">Billing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/settings">Subscription</Link>
                    </DropdownMenuItem>
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
