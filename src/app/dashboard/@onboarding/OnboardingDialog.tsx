'use client'

import React from 'react'

import StudentOnboardingForm from './StudentOnboardingForm'
import { Course, Moderator, User, UserType } from '@prisma/client'
import ModeratorForm from './ModeratorForm'
import { Button } from '@/components/ui/button'
import WithDialog from '@/components/dashboard/WithDialog'
import { Sparkles } from 'lucide-react'

type Props = {
    courses: Course[]
    isApproved: boolean
    user:
        | (User & {
              moderator: Moderator | null
              course: Course | null
          })
        | null
}

export default function OnboardingDialog({ courses, user, isApproved }: Props) {
    const [open, setOpen] = React.useState(false)
    const [userType, setUserType] = React.useState<UserType | null>(
        isApproved ? UserType.MODERATOR : null
    )
    return (
        <div>
            {userType ? (
                <div>
                    {userType === UserType.STUDENT ? (
                        <WithDialog
                            open={open}
                            setOpen={setOpen}
                            triggerText="Get Started"
                            title="Update your profile"
                            triggerIcon={false}
                            description={
                                <ul className="flex gap-2 items-center">
                                    <span>
                                        We will use this information to
                                        personalize your experience.
                                    </span>
                                    <Sparkles
                                        size={15}
                                        className="text-yellow-500"
                                    />
                                </ul>
                            }
                            buttonText="Add"
                        >
                            <StudentOnboardingForm
                                setOpen={setOpen}
                                userType={userType}
                                setUserType={setUserType}
                                courses={courses}
                                user={user}
                            />
                        </WithDialog>
                    ) : (
                        <WithDialog
                            open={open}
                            setOpen={setOpen}
                            triggerText="Get Started"
                            title="By Becoming a moderator"
                            triggerIcon={false}
                            description={
                                <>
                                    <span className="my-2 text-md">
                                        You will:
                                    </span>
                                    <ul className="list-disc px-4 py-2 flex flex-col gap-2">
                                        <li className="flex gap-2 items-center">
                                            <Sparkles
                                                className="text-yellow-500"
                                                size={15}
                                            />
                                            <strong>Enable</strong> students
                                            instant access to updated course
                                            materials
                                        </li>
                                        <li className="flex gap-2 items-center">
                                            <Sparkles
                                                className="text-yellow-500"
                                                size={15}
                                            />
                                            <span>
                                                <strong>Support</strong>&nbsp;
                                                students in revising by Adding
                                                past exams and practice
                                                materials
                                            </span>
                                        </li>
                                        <li className="flex gap-2 items-center">
                                            <Sparkles
                                                className="text-yellow-500"
                                                size={15}
                                            />
                                            <strong>Control</strong> who can
                                            view the course materials
                                        </li>
                                    </ul>
                                </>
                            }
                            buttonText="Add"
                        >
                            <ModeratorForm
                                setOpen={setOpen}
                                userType={userType}
                                setUserType={setUserType}
                            />
                        </WithDialog>
                    )}
                </div>
            ) : (
                <WithDialog
                    open={open}
                    setOpen={setOpen}
                    triggerText="Get Started"
                    title="Choose Role"
                    triggerIcon={false}
                    description="your role will determine how you experience your dashboard"
                    buttonText="Add"
                >
                    <div>
                        {/* <h2 className="my-2 text-2xl ">I am a</h2> */}
                        <div className="flex gap-6 flex-wrap">
                            <Button
                                onClick={() => setUserType(UserType.STUDENT)}
                                className="p-8 rounded-md bg-secondary"
                            >
                                <p className="text-xl font-semibold">Student</p>
                            </Button>
                            <Button
                                onClick={() => setUserType(UserType.MODERATOR)}
                                className="p-8 rounded-md bg-secondary"
                            >
                                <p className="text-xl font-semibold">
                                    Moderator
                                </p>
                            </Button>
                        </div>
                    </div>
                </WithDialog>
            )}
        </div>
        // {/* <AcceptPolicies title="" /> */}
    )
}
