import {
    Calendar,
    HelpCircle,
    LayoutDashboard,
    Library,
    LogOut,
    MessageCircle,
    Package2,
    Plus,
    Settings,
    Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import UserAvatar from '../ui/UserProfile'
import { Suspense } from 'react'
import LogoutButton from '../LogoutButton'

const Sidebar = () => {
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
            href: '/dashboard/content',
            name: 'My Content',
            icon: <Library />,
        },
    ]
    //todod add link when user is moderator

    return (
        <nav className=" w-full min-h-screen border-r bg-cyan-200/20 dark:bg-blue-900/10  dark:border-blue-700/20 shadow-md  h-full sticky top-0 items-start z-50 pt-32">
            <div className="flex flex-col h-full  justify-between  overflow-auto">
                <ul className="px-4 text-sm font-medium flex-1">
                    {navigation.map((item, idx) => (
                        <li key={idx}>
                            <Link
                                href={item.href}
                                className="my-2 flex items-center gap-x-2  p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-gray-700 dark:active:bg-gray-700  duration-150"
                            >
                                <div className="">{item.icon}</div>
                                {item.name}
                            </Link>
                        </li>
                    ))}

                    {/* <li className="my-2 flex items-center gap-x-2  p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-gray-700 dark:active:bg-gray-700  duration-150">
                        <Plus />
                        <Link href="/dashboard/add">Add</Link>
                    </li> */}
                </ul>
                <div className="text-yellow-400 bg-purple-600 hover:bg-purple-50 active:bg-purple-100 dark:hover:bg-purple-700 dark:active:bg-purple-700 py-6 px-2">
                    <Link
                        href="/dashboard/add"
                        className="flex items-center gap-x-2  p-2 rounded-lg   duration-150"
                    >
                        <Sparkles />
                        <p>Unlock credits</p>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar
