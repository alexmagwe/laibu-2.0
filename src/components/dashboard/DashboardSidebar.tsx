import { Sparkles } from 'lucide-react'
import Link from 'next/link'
export type SidebarLink = {
    href: string
    name: string
    icon: React.ReactNode
}
type Props = {
    navigation: SidebarLink[]
    showFooter?: boolean
}

const Sidebar = ({ navigation, showFooter = false }: Props) => {
    //todo add link for adding content when user is moderator

    return (
        <aside className="max-w-xs min-h-screen border-r bg-secondary shadow-lg sticky top-0 items-start z-50 pt-32">
            <div className="w-full h-full">
                <div className="flex flex-col h-full  justify-between  overflow-auto">
                    <ul className="px-4 text-sm font-medium flex-1">
                        {navigation.map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    href={item.href}
                                    className="my-2 flex items-center gap-x-2  p-2 rounded-lg  hover:bg-accent   duration-150"
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
                    {/* {showFooter ? (
                        <div className="text-yellow-400 bg-purple-600 hover:bg-purple-50 active:bg-purple-100 dark:hover:bg-purple-700 dark:active:bg-purple-700 py-6 px-2">
                            <Link
                                href="/dashboard/add"
                                className="flex items-center gap-x-2  p-2 rounded-lg   duration-150"
                            >
                                <Sparkles />
                                <p>Unlock credits</p>
                            </Link>
                        </div>
                    ) : null} */}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
