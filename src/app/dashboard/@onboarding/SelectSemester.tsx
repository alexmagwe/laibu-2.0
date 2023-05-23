'use client'
import * as React from 'react'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { formContext } from './UserForm'
import LabelledInput from '@/components/forms/LabelledInput'
const semesters = [
    { id: 1, name: '1st Semester' },
    { id: 2, name: '2nd Semester' },
]
export function SelectSemester({ title }: { title: string }) {
    const [open, setOpen] = React.useState(false)
    const { setSemester, semester } = React.useContext(formContext)

    return (
        <LabelledInput title={title}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="  justify-between"
                    >
                        {semester
                            ? semesters.find((y) => y.id == semester)?.name
                            : 'Select semester...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                    <Command>
                        <CommandInput placeholder="Search semester..." />
                        <CommandEmpty>No semester found.</CommandEmpty>
                        <CommandGroup>
                            {semesters.map((item) => (
                                <CommandItem
                                    value={item.id.toString()}
                                    key={item.id}
                                    onSelect={(currentValue) => {
                                        setSemester(
                                            semester === parseInt(currentValue)
                                                ? undefined
                                                : item.id
                                        )
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            semester && semester === item.id
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {item.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </LabelledInput>
    )
}
