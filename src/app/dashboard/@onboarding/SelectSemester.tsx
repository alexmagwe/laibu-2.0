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
const semesters = [
    { value: 1, label: '1st Semester' },
    { value: 2, label: '2nd Semester' },
]
type Props = {
    title: string
    form: StudentFormType
}

export function SelectSemester({ title, form }: Props) {
    const [open, setOpen] = React.useState(false)

    return (
        <FormField
            name="semester"
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
                                    ? semesters.find(
                                          (semester) =>
                                              semester.value === field.value
                                      )?.label
                                    : 'Select Semester...'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className=" p-0">
                            <Command>
                                <CommandInput placeholder="Search course..." />
                                <CommandEmpty>
                                    No Semesters to pick from.
                                </CommandEmpty>
                                <CommandGroup>
                                    {semesters.map((item) => (
                                        <CommandItem
                                            value={item.value.toString()}
                                            key={item.value}
                                            onSelect={(currentValue) => {
                                                form.setValue(
                                                    'semester',
                                                    parseInt(currentValue)
                                                )
                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    field.value &&
                                                        field.value ===
                                                            item.value
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                            {item.label}
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
