import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import SideBar from '@/components/dashboard/DashboardSidebar'
import { db } from '@/lib/db'
import { getUser } from '@/lib/getUser'
import React from 'react'
import { Toaster } from 'react-hot-toast'
type Props = {
    children: React.ReactNode
    onboarding: React.ReactNode
}

async function layout({ children, onboarding }: Props) {
    const auth = await getUser()
    const user = await db.user.findFirst({
        where: {
            email: auth?.email,
        },
    })

    return (
        <main className="flex  ">
            <Toaster />
            <div className="max-w-xs ">
                <SideBar />
            </div>
            <div className="flex-1  col-span-7 flex flex-col gap-4 ">
                <DashboardNavbar />
                {auth && user?.isNew ? onboarding : children}
            </div>
        </main>
    )
}

export default layout
