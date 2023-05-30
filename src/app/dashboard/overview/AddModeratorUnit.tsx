'use client'
import WithDialog from '@/components/dashboard/WithDialog'
import React from 'react'
import ModeratorForm from '../@onboarding/ModeratorForm'
import { Unit } from '@prisma/client'

type Props = {
    moderatorId: string
    data: Unit[]
    useIcon?: boolean
}

export default function AddModeratorUnit({
    data,
    moderatorId,
    useIcon,
}: Props) {
    const [open, setOpen] = React.useState(false)
    return (
        <WithDialog
            open={open}
            setOpen={setOpen}
            triggerText="Add"
            title="Update Units that you will moderate"
            triggerIcon={useIcon}
            description=""
            buttonText="Add"
        >
            <ModeratorForm
                update
                setOpen={setOpen}
                moderatorId={moderatorId}
                currentUnits={data}
            />
        </WithDialog>
    )
}
