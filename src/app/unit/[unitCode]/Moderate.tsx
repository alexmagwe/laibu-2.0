'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { moderationFormSchema } from '@/lib/validations/moderate'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
    Dialog,
    DialogTrigger,
    DialogHeader,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Sparkles } from 'lucide-react'
import { Unit, UserModeratingUnit } from '@prisma/client'

type Props = {
    unit: Unit
    moderators: UserModeratingUnit[]
}

export default function Moderate({ unit, moderators }: Props) {
    const [open, setOpen] = React.useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <p>
                There is one more slot remaining to Become a moderator for this
                unit
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
                                <strong>Delete</strong> content for this unit
                            </li>
                            <li>
                                <strong>Set Permissions</strong>
                                &nbsp;on who can view the content for this unit
                            </li>
                        </ul>
                    </DialogDescription>
                </DialogHeader>
                <ModerateForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}
type FormProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function ModerateForm({ setOpen }: FormProps) {
    const form = useForm<z.infer<typeof moderationFormSchema>>({
        resolver: zodResolver(moderationFormSchema),
        defaultValues: {
            phoneNumber: '1234567890',
        },
    })
    const onSubmit = (data: z.infer<typeof moderationFormSchema>) => {
        setOpen(false)
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="0123456789" {...field} />
                            </FormControl>
                            <FormDescription>
                                We need your phone number in case we need to
                                contact you
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="" type="submit">
                    Apply
                </Button>
            </form>
        </Form>
    )
}
