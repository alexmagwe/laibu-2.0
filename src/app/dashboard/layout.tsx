import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import SideBar from '@/components/dashboard/DashboardSidebar'
import { getAuthUser, getUserFromDb } from '@/lib/user'
import { Calendar, LayoutDashboard, Library } from 'lucide-react'
import React from 'react'
import { Toaster } from 'react-hot-toast'
type Props = {
    children: React.ReactNode
    onboarding: React.ReactNode
}
export const metadata = {
    title: 'Laibu',
    description: 'Personalized learning platform for students',
    keywords: ['laibu dashboard', 'laibu', 'laibu notes'],
}
const navigation = [
    {
        href: '/dashboard',
        name: 'Overview',
        icon: <LayoutDashboard />,
    },
    // {
    //     href: '/units',
    //     name: 'Units',
    //     icon: <Package2 />,
    // },
    // {
    //     href: '/chat',
    //     name: 'Chat',
    //     icon: <MessageCircle />,
    // },
    {
        href: '/dashboard/timetable',
        name: 'TimeTable',
        icon: <Calendar />,
    },
    {
        href: '/dashboard/units',
        name: 'Units',
        icon: <Library />,
    },
]
async function layout({ children, onboarding }: Props) {
    const auth = await getAuthUser()
    const user = await getUserFromDb()

    return (
        <main className="flex bg-background ">
            <Toaster />
            <SideBar navigation={navigation} />
            <div className="flex-1  col-span-7 flex flex-col gap-4 ">
                <DashboardNavbar />
                {auth && user?.isNew ? onboarding : children}
            </div>
        </main>
    )
}

export default layout
