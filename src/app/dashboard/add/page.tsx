import React from 'react'
import SemesterUnits, { UnitsSkeleton } from '../overview/SemesterUnits'
import { getUserFromDb } from '@/lib/user'
import WithModerator from '@/components/dashboard/WithModerator'

type Props = {}

async function page({}: Props) {
    const user = await getUserFromDb()
    return (
        // @ts-expect-error Server Component
        <WithModerator>
            <div>
                <h1 className="text-2xl mb-4">
                    <React.Suspense fallback={<UnitsSkeleton />}>
                        {/* @ts-expect-error Server Component */}
                        <SemesterUnits
                            pathSuffix="/add"
                            title="Choose Unit"
                            user={user}
                        />
                    </React.Suspense>
                </h1>
            </div>
        </WithModerator>
    )
}

export default page
