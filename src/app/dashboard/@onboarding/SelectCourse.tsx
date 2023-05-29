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
import { StudentFormType } from './StudentOnboardingForm'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Course } from '@prisma/client'
type Props = {
    title: string
    courses: Course[]
    form: StudentFormType
}
export function SelectCourse({ title, form, courses }: Props) {
    const [open, setOpen] = React.useState(false)

    return (
        <FormField
            name="course"
            control={form.control}
            render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                    <FormLabel>{title}</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="  justify-between"
                            >
                                {field.value
                                    ? field.value.name
                                    : 'Select course...'}
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
                                                        course.id ===
                                                        currentValue
                                                )
                                                form.setValue(
                                                    'course',
                                                    selected!
                                                )
                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    field.value &&
                                                        field.value.name ===
                                                            item.name
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
                </FormItem>
            )}
        />
    )
}
