'use client'
import React from 'react'

import {
    Dialog,
    DialogTrigger,
    DialogHeader,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Sparkles } from 'lucide-react'
import { ModerateForm } from './ModerateForm'
import { UserWithCourse } from '@/lib/validations/userInfoSchema'

type Props = {
    user: UserWithCourse
}

export default function Moderate({ user }: Props) {
    const [open, setOpen] = React.useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <p>
                There is one more slot remaining to Become a moderator for this
                course
            </p>
            <DialogTrigger className="flex gap-2 items-center text-yellow-500">
                <span>click here to apply</span>
                <span>
                    <Sparkles />
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className=" flex gap-2 items-center">
                        <Sparkles className="text-yellow-500" />
                        <span className="">Becoming a Moderator</span>
                    </DialogTitle>
                    <DialogDescription className="">
                        By applying to become a moderator, you will be able to:
                        <ul className="flex px-6 flex-col my-4 list-disc gap-2">
                            <li>
                                <strong>Add</strong> or&nbsp;
                                <strong>Delete</strong> content all units
                            </li>
                            <li>
                                <strong>Set Permissions</strong>
                                &nbsp;on who can view the content
                            </li>
                        </ul>
                    </DialogDescription>
                </DialogHeader>
                <ModerateForm user={user} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}
