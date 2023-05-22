import { db } from '@/lib/db'
import { UserWithCourse } from '@/lib/validations/userInfoSchema'
import { User } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import empty from '/public/assets/empty.png'
import { clsx } from 'clsx'
import _ from 'lodash'
type Props = {
    user: UserWithCourse
}

async function SemesterUnits({ user }: Props) {
    const data = await db.unit.findMany({
        where: {
            courses: {
                some: {
                    id: user?.courseId!,
                },
            },
            semester: { equals: user?.semester! },
            year: { equals: user?.year! },
        },
    })
    return (
        <div
            className={clsx(
                'bg-cyan-200/20 dark:bg-blue-900/10 p-4  rounded-md',
                data.length > 8 ? 'w-full' : 'lg:w-2/3'
            )}
        >
            <h2 className="text-2xl font-bold mb-4">Semester Units</h2>
            {data.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                    {_.sortBy(data, 'type').map((item) => (
                        <Link
                            className="w-full sm:w-auto bg-cyan-400/20 hover:scale-105 hover:bg-cyan-300/20 dark:hover:bg-blue-800/20 duration-200 relative dark:bg-blue-900/20 rounded-md flex gap-2 md:items-center py-8 px-8"
                            key={item.id}
                            href={`/dashboard/units/${item.code}`}
                        >
                            <div className="px-4 py-6 flex flex-col  md:items-center">
                                <h2 className="text-2xl">{item.name}</h2>
                                <h3 className="text-lg text-gray-500">
                                    {item.code}
                                </h3>
                                <div
                                    className={clsx(
                                        'rounded-lg absolute bottom-5 right-2 text-xs p-2 ',
                                        item.type === 'Core'
                                            ? 'bg-green-500/20 dark:bg-green-400/20 text-green-500 dark:text-green-400'
                                            : 'bg-purple-500/20 dark:bg-purple-400/20 text-purple-500 dark:text-purple-400'
                                    )}
                                >
                                    {item.type}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div>
                    <div className="p-4  flex flex-col gap-4 items-center">
                        <Image
                            src={empty.src}
                            alt="empty content"
                            width={150}
                            height={150}
                        />
                        <h2 className="text-xl">
                            Units for this course are not Available,
                            <Link
                                href="/dashboard/add"
                                className="text-purple-600 dark:text-purple-400"
                            >
                                &nbsp;earn free credits by adding the units
                            </Link>
                        </h2>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SemesterUnits

export const UnitsSkeleton = () => {
    return (
        <div className="p-4 ">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-6 bg-cyan-300/20 rounded w-1/4 flex-col gap-4"></div>
                    <div className="flex gap-4 items-center w-2/3 ">
                        <div className="h-36 flex-1 bg-cyan-300/20 dark:bg-gray-700 rounded"></div>
                        <div className="h-36 w-24 flex-1 bg-cyan-300/20 dark:bg-gray-700 rounded "></div>
                        <div className="h-36 w-36 flex-1 bg-cyan-300/20 dark:bg-gray-700 rounded "></div>
                        <div className="h-36 flex-1 bg-cyan-300/20 dark:bg-gray-700 rounded "></div>
                    </div>
                    <div className="flex gap-4 items-center w-2/3 ">
                        <div className="h-36 w-24 flex-1 bg-cyan-300/20 dark:bg-gray-700 rounded"></div>
                        <div className="h-36 w-30 flex-1 bg-cyan-300/20 dark:bg-gray-700 rounded "></div>
                        <div className="h-36 flex-1 bg-cyan-300/20 dark:bg-gray-700 rounded "></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
