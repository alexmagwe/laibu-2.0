import { ChevronRight, ChevronsUpDown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Content, Course, Unit } from '@prisma/client'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import clsx from 'clsx'
export type SidebarLink = {
    href: string
    name: string
    icon: React.ReactNode
}
type Props = {
    navigation: SidebarLink[]
    showFooter?: boolean
    unit: Unit
}

const Sidebar = ({ navigation, showFooter = false, unit }: Props) => {
    //todo add link when user is moderator

    return (
        <aside className="max-w-[200px] bg-secondary  min-h-screen  shadow-md sticky top-0 items-start z-50 pt-8">
            <div className="w-full h-full flex flex-col ">
                <SidebarHeader unit={unit} />
                <div className=" flex flex-col flex-1 items-center justify-between">
                    <ul className="px-4 text-sm  font-medium ">
                        {navigation.map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    href={item.href}
                                    className="my-2 flex items-center gap-x-2  p-2 rounded-lg  hover:bg-accent active:bg-accent  duration-150"
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
                    {showFooter ? (
                        <div className="text-yellow-400 bg-purple-600 hover:bg-purple-50 active:bg-purple-100 dark:hover:bg-purple-700 dark:active:bg-purple-700 py-6 px-2">
                            <Link
                                href="/dashboard/add"
                                className="flex items-center gap-x-2  p-2 rounded-lg   duration-150"
                            >
                                <Sparkles />
                                <p>Unlock credits</p>
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
type HeaderProps = {
    unit: Unit
}
const SidebarHeader = ({ unit }: HeaderProps) => {
    return (
        <div className="w-full text-center flex flex-col items-center justify-center gap-y-2 p-4">
            <p className="text-2xl font-medium">{unit?.name}</p>
            <Collapsible>
                <CollapsibleTrigger>
                    <div className="flex gap-1 items-center">
                        <p className="text-sm text-muted-foreground">
                            {unit?.code}
                        </p>
                        <ChevronsUpDown
                            className="inline-block text-purple-700"
                            size={20}
                        />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="py-2">
                        <p className="text-md text-muted-foreground mb-2">
                            Semester {unit.semester}
                        </p>
                        <p
                            className={clsx(
                                'text-md mb-2',
                                unit.type == 'Core'
                                    ? 'text-lime-500'
                                    : 'text-muted-foreground'
                            )}
                        >
                            {unit.type}
                        </p>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}
