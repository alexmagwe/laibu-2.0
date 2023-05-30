import { db } from '@/lib/db'
import { UserWithCourse } from '@/lib/validations/userInfoSchema'
import { User } from '@prisma/client'
import Link from 'next/link'
import React, { cache } from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import _ from 'lodash'
import EmptyContent from '@/components/ui/emptyContent'
import UnitCard from '@/components/dashboard/UnitCard'
type Props = {
    user: UserWithCourse
    title?: string
    pathSuffix?: string
}
export const getSemesterUnits = cache(async (user: UserWithCourse) => {
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
    return data
})

async function SemesterUnits({ user, title, pathSuffix }: Props) {
    const data = await getSemesterUnits(user)

    return (
        <div
            className={clsx(
                'bg-card border-2 p-4  rounded-md',
                data.length > 8 ? 'w-full' : 'xl:w-3/4'
            )}
        >
            <h2 className="text-2xl font-bold mb-4">
                {title ? title : 'Semester Units'}
            </h2>
            {data.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                    {_.sortBy(data, 'type').map((item, i) => (
                        <UnitCard pathSuffix={pathSuffix} key={i} item={item} />
                    ))}
                </div>
            ) : (
                <EmptyContent caption=" Units for this course are not Available" />
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
