'use client'

import React from 'react'

import StudentOnboardingForm from './StudentOnboardingForm'
import { Course, Moderator, User, UserType } from '@prisma/client'
import ModeratorForm from './ModeratorForm'
import WithDialog from '@/components/dashboard/WithDialog'
import { Sparkles } from 'lucide-react'
import { ChooseRole } from './ChooseRole'

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
                                            <span>
                                                <strong>Enable</strong>&nbsp;
                                                access to course materials by
                                                adding content&nbsp;
                                            </span>
                                        </li>
                                        <li className="flex gap-2 items-center">
                                            <Sparkles
                                                className="text-yellow-500"
                                                size={15}
                                            />
                                            <span>
                                                <strong>Support</strong>&nbsp;
                                                student&apos;s revision by
                                                Adding practice materials
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
                    {<ChooseRole setUserType={setUserType} />}
                </WithDialog>
            )}
        </div>
        // {/* <AcceptPolicies title="" /> */}
    )
}
