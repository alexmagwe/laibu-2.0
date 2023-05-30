import React from 'react'
import SemesterUnits, { UnitsSkeleton } from '../overview/SemesterUnits'
import { getUserFromDb } from '@/lib/user'
import WithModerator from '@/components/dashboard/WithModerator'
import UnitCard from '../../../components/dashboard/UnitCard'
import Link from 'next/link'

type Props = {}

async function page({}: Props) {
    const user = await getUserFromDb()
    return (
        // @ts-expect-error Server Component
        <WithModerator>
            <div className="p-4">
                <div className="text-2xl mb-4 flex flex-col gap-6">
                    <div className="px-6 py-4 flex items-center justify-start gap-4 rounded-md border-2">
                        <Link
                            className="w-full sm:w-auto bg-secondary shadow-md hover:scale-105 hover:bg-accent duration-200 relative  rounded-md flex gap-2 md:items-center py-8 px-8"
                            href="/dashboard/add/unit"
                        >
                            Add Unit
                        </Link>
                        <Link
                            className="w-full sm:w-auto bg-secondary shadow-md hover:scale-105 hover:bg-accent duration-200 relative  rounded-md flex gap-2 md:items-center py-8 px-8"
                            href="/dashboard/add/timetable"
                        >
                            Add Timetable
                        </Link>
                    </div>
                    <React.Suspense fallback={<UnitsSkeleton />}>
                        {/* @ts-expect-error Server Component */}
                        <SemesterUnits
                            pathSuffix="/add"
                            title="Add content to Unit"
                            user={user}
                        />
                    </React.Suspense>
                </div>
            </div>
        </WithModerator>
    )
}

export default page
