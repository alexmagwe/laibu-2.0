import { Link2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}
const links = [
    {
        name: 'Add Unit',
        link: '/dashboard/add/unit',
    },
    {
        name: 'Add Course',
        link: '/dashboard/add/course',
    },
]
function page({}: Props) {
    return (
        <div className="p-4">
            <div className=" p-4 md:w-2/3  ">
                <h1 className="text-2xl mb-4">
                    What do you want to add today?
                </h1>
                <div className="flex gap-4 items-center">
                    {links.map((item, i) => (
                        <Link
                            key={i}
                            className="bg-cyan-400/20 dark:bg-blue-900/20 rounded-md flex gap-2 items-center py-16 px-8"
                            href={item.link}
                        >
                            <span className="text-lg font-semibold">
                                {item.name}
                            </span>
                            <Link2 />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page
