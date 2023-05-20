'use client'
import React from 'react'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
type Props = {}

export default function LogoutButton({}: Props) {
    return (
        <button
            className="flex items-center gap-x-2  p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-gray-700 dark:active:bg-gray-700 duration-150"
            onClick={() => signOut()}
        >
            <LogOut />
            <span>Logout</span>
        </button>
    )
}
