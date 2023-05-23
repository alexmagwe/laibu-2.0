'use client'
import React, { Fragment } from 'react'
import MultiStep from 'react-multistep'
import CourseSearch from './CourseSearch'
import { SelectCourse } from './SelectCourse'
import { Course, User } from '@prisma/client'
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
import { Loader2, Router } from 'lucide-react'
import { userUniversitySchema } from '@/lib/validations/userUniversitySchema'
import { useRouter } from 'next/navigation'
type Props = {
    courses: Course[]
    user: User | null
}
const steps = [
    {
        title: 'Course',
        component: (
            <SelectCourse title="What course are you currently taking?" />
        ),
    },
    {
        title: 'Year',
        component: <SelectYear title="What year are you currently in?" />,
    },
    {
        title: 'Semester',
        component: (
            <SelectSemester title="What semester are you currently in?" />
        ),
    },
    // {
    //   title: "Terms and Conditions",
    //   component: <AcceptPolicies title="" />,
    // },
]
type FormContextType = {
    course: undefined | Course
    year: number | undefined
    acceptedTerms: boolean | undefined
    setAcceptedTerms: React.Dispatch<React.SetStateAction<boolean | undefined>>
    courses: Course[]
    semester: number | undefined
    setCourse: React.Dispatch<React.SetStateAction<Course | undefined>>
    setYear: React.Dispatch<React.SetStateAction<number | undefined>>
    setSemester: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const formContext = React.createContext<FormContextType>({
    course: undefined,
    year: undefined,
    acceptedTerms: undefined,
    setAcceptedTerms: () => {},
    courses: [],
    semester: undefined,
    setCourse: () => {},
    setYear: () => {},
    setSemester: () => {},
})

export default function UserForm({ courses, user }: Props) {
    const [course, setCourse] = React.useState<Course>()
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [year, setYear] = React.useState<number | undefined>()
    const [acceptedTerms, setAcceptedTerms] = React.useState<
        boolean | undefined
    >()
    const [semester, setSemester] = React.useState<number | undefined>()

    const handleSubmit = async () => {
        setIsSubmitting(true)
        //TODO add accept terms
        const result = userUniversitySchema.safeParse({
            course: course,
            year: year,
            semester: semester,
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="rounded-md px-3 py-2 text-white bg-purple-600">
                    Get started
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <formContext.Provider
                    value={{
                        course: course,
                        year: year,
                        acceptedTerms: acceptedTerms,
                        setAcceptedTerms: setAcceptedTerms,
                        courses: courses,
                        semester: semester,
                        setCourse: setCourse,
                        setSemester: setSemester,
                        setYear: setYear,
                    }}
                >
                    <SelectCourse title="What Course are you currently enrolled in? " />
                    <SelectYear title="What year are you currently in" />
                    <SelectSemester title="What semester are you currently in" />
                    {/* <AcceptPolicies title="" /> */}
                </formContext.Provider>
                <DialogFooter>
                    <Button
                        className="bg-purple-600 text-slate-100"
                        disabled={isSubmitting}
                        onClick={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                    >
                        {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <span>Save changes</span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
