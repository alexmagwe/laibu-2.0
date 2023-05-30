'use client'
import Search from '@/components/search/Search'
import SearchContextProvider from '@/components/search/context'
import { Unit, UserType } from '@prisma/client'
import React from 'react'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import { searchClient } from '@/lib/algolia/client'
import { ChevronLeft, Loader2, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { ZodError } from 'zod'
import {
    unitModerationSchema,
    unitsUpdateModerationSchema,
} from '@/lib/validations/moderationValidator'
import { useRouter } from 'next/navigation'

type Props = {
    userType?: UserType | null
    currentUnits?: Unit[]
    update?: boolean
    moderatorId?: string
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    setUserType?: React.Dispatch<React.SetStateAction<UserType | null>>
}

interface SelectedUnits {
    [id: string]: Unit
}
export default function ModeratorForm({
    userType,
    currentUnits,
    moderatorId,
    setUserType,
    update,
    setOpen,
}: Props) {
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const router = useRouter()
    const [units, setUnits] = React.useState<SelectedUnits>(
        currentUnits && currentUnits.length > 0
            ? currentUnits.reduce((acc, unit) => {
                  acc[unit.id] = unit
                  return acc
              }, {} as SelectedUnits)
            : {}
    )

    const addUnit = (unit: Unit) => {
        setUnits({ ...units, [unit.id]: unit })
    }
    const handleDelete = (id: string) => {
        setUnits((prev) => {
            const newUnits = { ...prev }
            delete newUnits[id]
            return newUnits
        })
    }
    const handleSubmit = async () => {
        setIsSubmitting(true)
        if (update) {
            if (!moderatorId) return toast.error('Missing moderator id')
            //separate list of units to be added and removed
            const toBeAdded = Object.keys(units).filter((id) => {
                return !currentUnits?.find((unit) => unit.id === id)
            })
            const toBeRemoved = currentUnits?.filter((unit) => {
                return !units[unit.id]
            })

            try {
                const data = {
                    moderatorId,
                    createUnits: toBeAdded,
                    deleteUnits: toBeRemoved?.map((unit) => unit.id),
                }
                const payload = unitsUpdateModerationSchema.parse(data)
                const res = await fetch('/api/users/moderator', {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                })
                if (res.status === 200) {
                    toast.success('updated Succesfully', {
                        duration: 3000,
                    })
                    router.refresh()
                    setOpen && setOpen(false)
                } else {
                    toast.error('Something  went wrong')
                }
                if (res.status == 422) {
                    const json = await res.json()

                    toast.error('validation failed,check logs for more details')
                    console.error(json.message)
                }
                setIsSubmitting(false)
            } catch (e) {
                if (e instanceof ZodError) console.error(e.issues)
                setIsSubmitting(false)
                console.log(e)
                toast.error('Something went wrong')
            }
        } else {
            try {
                const data = Object.keys(units).map((id) => {
                    return { id: id }
                })
                const payload = unitModerationSchema.parse(data)
                const res = await fetch('/api/users/moderator', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                })
                const json = await res.json()
                if (res.status === 200) {
                    if (json.approved) {
                        toast.success('you have been approved as a moderator', {
                            duration: 10000,
                        })
                    } else {
                        toast.success(
                            'your moderation request has been sent to the admin,you will be notified when you are approved',
                            {
                                duration: 10000,
                            }
                        )
                    }
                    router.refresh()
                    setOpen && setOpen(false)
                } else {
                    toast.error('Something went wrong')
                }
                if (res.status == 422) {
                    toast.error('validation failed,check log for more details')
                    console.error(json.message)
                }
                setIsSubmitting(false)
            } catch (e) {
                if (e instanceof ZodError) console.error(e.issues)
                setIsSubmitting(false)
                toast.error('Something went wrong')
            }
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-4 ">
                <h2>Add Units that you wish to moderate</h2>
                <InstantSearch
                    searchClient={searchClient} // this is the Algolia client
                    indexName="units" // this is your index name
                >
                    <SearchContextProvider callback={addUnit} index="units">
                        <Search />
                    </SearchContextProvider>
                </InstantSearch>

                <div
                    className={clsx(
                        'flex flex-wrap  rounded-md',
                        Object.keys(units).length > 0 &&
                            'border-2 gap-3 py-3 px-2'
                    )}
                >
                    {Object.values(units).map((unit) => (
                        <div
                            key={unit.id}
                            className="flex  items-end border-2 rounded-md p-2"
                        >
                            <div className="flex flex-col gap-2">
                                <p className="text-xl break-words">
                                    {unit.name}
                                </p>
                                <p className="text-muted-foreground">
                                    {unit.code}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(unit.id)}
                                className="px-3 py-2  text-destructive"
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                    ))}
                </div>
                <div
                    className={clsx(
                        'flex items-center py-3',
                        userType && setUserType
                            ? 'justify-between'
                            : 'justify-end'
                    )}
                >
                    {userType && setUserType && (
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
                        className={clsx(
                            Object.keys(units).length < 1 &&
                                'bg-secondary my-2 text-muted-foreground'
                        )}
                        disabled={isSubmitting || Object.keys(units).length < 1}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <span>Save changes</span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
