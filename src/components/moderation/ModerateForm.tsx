'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    moderationFormSchema,
    moderationSchema,
} from '@/lib/validations/moderate'
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
import { db } from '@/lib/db'
import { UserWithCourse } from '@/lib/validations/userInfoSchema'
import { toast } from 'react-hot-toast'

type FormProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    user: UserWithCourse
}
export function ModerateForm({ setOpen, user }: FormProps) {
    const [loading, setLoading] = React.useState(false)
    const form = useForm<z.infer<typeof moderationFormSchema>>({
        resolver: zodResolver(moderationFormSchema),
        defaultValues: {
            phoneNumber: '1234567890',
        },
    })
    const onSubmit = async (data: z.infer<typeof moderationFormSchema>) => {
        setOpen(false)
        setLoading(true)
        const d = {
            phoneNumber: data.phoneNumber,
            courseId: user?.courseId,
            userId: user?.id,
            year: user?.year,
        }
        try {
            const payload = moderationSchema.parse(d)
            await fetch('/api/courses/moderate', {
                method: 'POST',
                body: JSON.stringify(payload),
            })
            toast.success('Moderation request sent')
            setLoading(false)
        } catch (e) {
            if (e instanceof z.ZodError) {
                console.log(e.errors)
                toast.error(e.errors[0].message)
                setLoading(false)
                return
            }
            console.log(e)
        }
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
