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

export function SelectCourse({ title }: { title: string }) {
    const [open, setOpen] = React.useState(false)
    const { courses, setCourse, course } = React.useContext(formContext)

    return (
        <LabelledInput title={title}>
            {courses.length > 0 ? (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="  justify-between"
                        >
                            {course ? course.name : 'Select course...'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className=" p-0">
                        <Command>
                            <CommandInput placeholder="Search course..." />
                            <CommandEmpty>No course found.</CommandEmpty>
                            <CommandGroup>
                                {courses.map((item) => (
                                    <CommandItem
                                        value={item.id}
                                        key={item.code}
                                        onSelect={(currentValue) => {
                                            let selected = courses.find(
                                                (course) =>
                                                    course.id === currentValue
                                            )
                                            setCourse(
                                                course?.id === currentValue
                                                    ? undefined
                                                    : selected
                                            )
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                course &&
                                                    course.name === item.name
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
            ) : (
                <Loader2 className="w-6 h-6 animate-spin" />
            )}
        </LabelledInput>
    )
}
