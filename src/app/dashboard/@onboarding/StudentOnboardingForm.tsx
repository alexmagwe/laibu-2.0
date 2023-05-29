'use client'
import React, { Fragment } from 'react'
import MultiStep from 'react-multistep'
import CourseSearch from './CourseSearch'
import { SelectCourse } from './SelectCourse'
import { Course, User, UserType } from '@prisma/client'
import { SelectYear } from './SelectYear'
import { SelectSemester } from './SelectSemester'
import AcceptPolicies from './AcceptPolicies'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import { ChevronLeft, Loader2, Router } from 'lucide-react'
import { userUniversitySchema } from '@/lib/validations/userUniversitySchema'
import { useRouter } from 'next/navigation'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'
import { studentOnboardingSchema } from '@/lib/validations/studentOnboardingValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
type Props = {
    courses: Course[]
    userType: UserType | null
    setUserType: React.Dispatch<React.SetStateAction<UserType | null>>
    user: User | null
}
// const steps = [
//     {
//         title: 'Course',
//         component: (
//             <SelectCourse title="What course are you currently taking?" />
//         ),
//     },
//     {
//         title: 'Year',
//         component: <SelectYear title="What year are you currently in?" />,
//     },
//     {
//         title: 'Semester',
//         component: (
//             <SelectSemester title="What semester are you currently in?" />
//         ),
//     },
//     // {
//     //   title: "Terms and Conditions",
//     //   component: <AcceptPolicies title="" />,
//     // },
// ]
export type StudentFormType = UseFormReturn<
    {
        course: {
            code: string
            id: string
            name: string
        }
        semester: number
        year: number
    },
    any
>

export default function StudentOnboardingForm({
    courses,
    user,
    userType,
    setUserType,
}: Props) {
    const form = useForm<z.infer<typeof studentOnboardingSchema>>({
        resolver: zodResolver(studentOnboardingSchema),
    })

    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const [acceptedTerms, setAcceptedTerms] = React.useState<
        boolean | undefined
    >()

    const onSubmit = async (data: z.infer<typeof studentOnboardingSchema>) => {
        setIsSubmitting(true)
        //TODO add accept terms
        const result = studentOnboardingSchema.safeParse({
            course: data.course,
            year: data.year,
            semester: data.semester,
        })
        if (result.success === false) {
            toast.error(result.error.message, { duration: 5000 })
            return
        }
        try {
            const resp = await fetch(`/api/users/${user?.id}`, {
                method: 'PUT',
                body: JSON.stringify(result.data),
            })
            if (resp.status == 201) {
                toast.success('Profile updated')
            } else {
                toast.error('Something went wrong')
            }
            setIsSubmitting(false)
            setOpen(false)
            router.refresh()
        } catch (e) {
            toast.error('Something went wrong')
            setIsSubmitting(false)
            setOpen(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <SelectCourse
                    courses={courses}
                    form={form}
                    title="What Course are you currently enrolled in? "
                />
                <SelectYear
                    form={form}
                    title="What year are you currently in"
                />
                <SelectSemester
                    form={form}
                    title="What semester are you currently in"
                />
                <div className="flex items-center justify-between">
                    {userType && (
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                className="bg-secondary my-3"
                                onClick={() => setUserType(null)}
                            >
                                <ChevronLeft />
                                <span>back</span>
                            </Button>
                        </div>
                    )}
                    <Button
                        className="bg-purple-600 text-slate-100"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <span>Save changes</span>
                        )}
                    </Button>
                </div>
            </form>
            {/* <AcceptPolicies title="" /> */}
        </Form>
    )
}
