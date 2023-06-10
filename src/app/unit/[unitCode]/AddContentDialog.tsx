'use client'
import React, { useEffect, useState } from 'react'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import {
    Dashboard,
    DashboardModal,
    DragDrop,
    ProgressBar,
    FileInput,
} from '@uppy/react'

import { uppy } from '@/lib/uppy'
import WithDialog from '@/components/dashboard/WithDialog'
import { ContentVariant, Unit } from '@prisma/client'
import { useRouter } from 'next/navigation'

type Props = {
    unit: Unit
    variant?: ContentVariant
    useIconTrigger?: boolean
}

export default function AddContentDialog({
    unit,
    variant,
    useIconTrigger,
}: Props) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (unit) {
            uppy.setOptions({
                meta: {
                    unitCode: unit.code,
                    unitId: unit.id,
                    variant: variant,
                },
            })
        }
    }, [unit, variant])
    return (
        <WithDialog
            styles="min-w-max"
            open={open}
            setOpen={setOpen}
            title="Add Content"
            description="Add content to your unit"
            buttonText="Add"
            triggerIcon={useIconTrigger}
            triggerText="Add Content"
        >
            <Dashboard
                theme="auto"
                doneButtonHandler={() => {
                    uppy.cancelAll()
                    console.log('refreshing')
                    router.refresh()
                    setOpen(false)
                }}
                fileManagerSelectionType="both"
                metaFields={[
                    { id: 'Id', name: 'Name', placeholder: 'File name' },
                ]}
                className="dark:text-white"
                plugins={['GoogleDrive']}
                uppy={uppy}
            />
            {/* <ProgressBar uppy={uppy} /> */}
        </WithDialog>
    )
}
