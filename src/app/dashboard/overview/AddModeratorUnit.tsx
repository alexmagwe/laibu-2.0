'use client'
import WithDialog from '@/components/dashboard/WithDialog'
import React from 'react'
import LecturerForm from '../@onboarding/LecturerForm'
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
            title="My Units"
            triggerIcon={useIcon}
            description="add units that you teach"
            buttonText="Add"
        >
            <LecturerForm
                update
                setOpen={setOpen}
                moderatorId={moderatorId}
                currentUnits={data}
            />
        </WithDialog>
    )
}
