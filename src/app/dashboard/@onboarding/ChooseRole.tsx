'use client'
import React from 'react'
import { UserType } from '@prisma/client'
import { Button } from '@/components/ui/button'

type ChooseRoleProps = {
    setUserType: React.Dispatch<React.SetStateAction<UserType | null>>
}
export const ChooseRole = ({ setUserType }: ChooseRoleProps) => {
    return (
        <div>
            {/* <h2 className="my-2 text-2xl ">I am a</h2> */}
            <div className="flex gap-6 flex-wrap">
                <Button
                    onClick={() => setUserType(UserType.STUDENT)}
                    className="p-8 rounded-md bg-secondary text-secondary-foreground hover:text-primary-foreground"
                >
                    <p className="text-xl font-semibold">Student</p>
                </Button>
                <Button
                    onClick={() => setUserType(UserType.MODERATOR)}
                    className="p-8 rounded-md bg-secondary text-secondary-foreground hover:text-primary-foreground"
                >
                    <p className="text-xl font-semibold">Moderator</p>
                </Button>
            </div>
        </div>
    )
}
