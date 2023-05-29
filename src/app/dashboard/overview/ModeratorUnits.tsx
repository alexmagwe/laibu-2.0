import UnitCard from '@/components/dashboard/UnitCard'
import WithDialog from '@/components/dashboard/WithDialog'
import EmptyContent from '@/components/ui/emptyContent'
import { db } from '@/lib/db'
import React, { cache } from 'react'
import LecturerForm from '../@onboarding/LecturerForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import AddModeratorUnit from './AddModeratorUnit'

type Props = {
    moderatorId: string
}
const getModeratorUnits = cache(async (moderatorId: string) => {
    const units = await db.unit.findMany({
        where: {
            moderator: {
                some: {
                    moderatorId: { equals: moderatorId },
                },
            },
        },
    })
    return units
})
export default async function ModeratorUnits({ moderatorId }: Props) {
    const data = await getModeratorUnits(moderatorId)

    return (
        <div className="bg-card rounded-md border-2 py-2 px-4 ">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-2xl capitalize mb-4">My Units</h1>
                <AddModeratorUnit
                    useIcon
                    moderatorId={moderatorId}
                    data={data}
                />
            </div>
            <div className="flex flex-wrap gap-4">
                {data.length > 0 ? (
                    data.map((unit) => <UnitCard key={unit.id} item={unit} />)
                ) : (
                    <div>
                        <EmptyContent caption="Get started by adding some units that you teach" />
                        <AddModeratorUnit
                            moderatorId={moderatorId}
                            data={data}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
