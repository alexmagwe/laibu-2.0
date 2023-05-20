import {
    Calendar,
    HelpCircle,
    LayoutDashboard,
    Library,
    LogOut,
    MessageCircle,
    Package2,
    Settings,
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
        {
            href: '/units',
            name: 'Units',
            icon: <Package2 />,
        },
        {
            href: '/chat',
            name: 'Chat',
            icon: <MessageCircle />,
        },
        {
            href: '/timetable',
            name: 'TimeTable',
            icon: <Calendar />,
        },
        {
            href: '/content',
            name: 'My Content',
            icon: <Library />,
        },
    ]

    const navsFooter = [
        {
            href: '/help',
            name: 'Help',
            icon: <HelpCircle />,
        },
        {
            href: '/settings',
            name: 'Settings',
            icon: <Settings />,
        },
    ]

    return (
        <nav className=" w-full min-h-screen border-r  dark:border-gray-700  h-full sticky top-0 items-start z-50 pt-32">
            <div className="flex flex-col h-full  justify-between  overflow-auto">
                <ul className="px-4 text-sm font-medium flex-1">
                    {navigation.map((item, idx) => (
                        <li key={idx}>
                            <a
                                href={item.href}
                                className="my-2 flex items-center gap-x-2  p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-gray-700 dark:active:bg-gray-700  duration-150"
                            >
                                <div className="">{item.icon}</div>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
                <div>
                    <ul className="px-4 pb-4 text-sm font-medium">
                        {navsFooter.map((item, idx) => (
                            <li key={idx}>
                                <a
                                    href={item.href}
                                    className="flex items-center gap-x-2  p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-gray-700 dark:active:bg-gray-700 duration-150"
                                >
                                    <div className="">{item.icon}</div>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                        <LogoutButton />
                    </ul>
                    <div className="py-4 px-4 border-t border-slate-300 dark:border-slate-700">
                        <div className="flex items-center gap-x-4">
                            <Suspense
                                fallback={
                                    <div className="w-full h-full bg-slate-300 dark:bg-slate-600 animate-pulse rounded-full p-2"></div>
                                }
                            >
                                <UserAvatar />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar
