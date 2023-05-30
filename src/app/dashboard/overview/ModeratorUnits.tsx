import UnitCard from '../../../components/dashboard/UnitCard'
import WithDialog from '@/components/dashboard/WithDialog'
import EmptyContent from '@/components/ui/emptyContent'
import { db } from '@/lib/db'
import React, { cache } from 'react'
import ModeratorForm from '../@onboarding/ModeratorForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import AddModeratorUnit from './AddModeratorUnit'

type Props = {
    moderatorId: string
}
const getModeratorUnits = cache(async (moderatorId: string) => {
    const units = await db.moderator.findFirst({
        where: {
            id: moderatorId,
        },
        include: {
            unitsModerating: {
                where: {
                    moderatorId: {
                        equals: moderatorId,
                    },
                },
                include: {
                    unit: true,
                },
            },
        },
    })
    return units
})
export default async function ModeratorUnits({ moderatorId }: Props) {
    const data = await getModeratorUnits(moderatorId)
    const units = data?.unitsModerating.map((unit) => unit.unit) ?? []

    return (
        <div className="bg-card rounded-md border-2 py-2 px-4 ">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-2xl capitalize mb-4">My Units</h1>
                <AddModeratorUnit
                    useIcon
                    moderatorId={moderatorId}
                    data={units}
                />
            </div>
            <div className="flex flex-wrap gap-4">
                {units.length > 0 ? (
                    units.map((unit) => <UnitCard key={unit.id} item={unit} />)
                ) : (
                    <div className="flex w-full flex-col gap-2 items-center justify-center">
                        <EmptyContent caption="Get started by adding some units that you will moderate" />
                        <AddModeratorUnit
                            moderatorId={moderatorId}
                            data={units}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
