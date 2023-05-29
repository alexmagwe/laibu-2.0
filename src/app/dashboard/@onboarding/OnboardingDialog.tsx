'use client'
import {
    Dialog,
    DialogTrigger,
    DialogHeader,
    DialogFooter,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { ChevronLeft } from 'lucide-react'
import React from 'react'

import StudentOnboardingForm from './StudentOnboardingForm'
import { Course, User, UserType } from '@prisma/client'
import LecturerForm from './LecturerForm'
import { Button } from '@/components/ui/button'

type Props = {
    courses: Course[]
    user: User | null
}

export default function OnboardingDialog({ courses, user }: Props) {
    const [open, setOpen] = React.useState(false)
    const [userType, setUserType] = React.useState<UserType | null>(null)
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

                {userType ? (
                    <div>
                        {userType === UserType.STUDENT ? (
                            <StudentOnboardingForm
                                userType={userType}
                                setUserType={setUserType}
                                courses={courses}
                                user={user}
                            />
                        ) : (
                            <LecturerForm
                                setOpen={setOpen}
                                userType={userType}
                                setUserType={setUserType}
                            />
                        )}
                    </div>
                ) : (
                    <div>
                        <h2 className="my-2 text-2xl ">I am a</h2>
                        <div className="flex gap-6 flex-wrap">
                            <Button
                                onClick={() => setUserType(UserType.STUDENT)}
                                className="p-8 rounded-md bg-secondary"
                            >
                                <p className="text-2xl font-semibold">
                                    Student
                                </p>
                            </Button>
                            <Button
                                onClick={() => setUserType(UserType.LECTURER)}
                                className="p-8 rounded-md bg-secondary"
                            >
                                <p className="text-2xl font-semibold">
                                    Lecturer
                                </p>
                            </Button>
                        </div>
                    </div>
                )}

                {/* <AcceptPolicies title="" /> */}
            </DialogContent>
        </Dialog>
    )
}
