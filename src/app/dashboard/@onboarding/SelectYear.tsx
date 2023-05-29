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
const years = [
    { value: 1, label: '1st Year' },
    { value: 2, label: '2nd Year' },
    { value: 3, label: '3rd Year' },
    { value: 4, label: '4th Year' },
    { value: 5, label: '5th Year' },
    { value: 6, label: '6th Year' },
]
type Props = {
    title: string
    form: StudentFormType
}
export function SelectYear({ title, form }: Props) {
    const [open, setOpen] = React.useState(false)

    return (
        <FormField
            name="year"
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
                                    ? years.find(
                                          (year) => year.value === field.value
                                      )?.label
                                    : 'Select year...'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className=" p-0">
                            <Command>
                                <CommandInput placeholder="Search year..." />
                                <CommandEmpty>
                                    No Semesters to pick from.
                                </CommandEmpty>
                                <CommandGroup>
                                    {years.map((item) => (
                                        <CommandItem
                                            value={item.value.toString()}
                                            key={item.value}
                                            onSelect={(currentValue) => {
                                                form.setValue(
                                                    'year',
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
