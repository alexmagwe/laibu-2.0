'use client'
import React from 'react'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
type Props = {}

export default function LogoutButton({}: Props) {
    return (
        <button className="" onClick={() => signOut()}>
            <span>Logout</span>
        </button>
    )
}
