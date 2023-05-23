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
const years = [
    { id: 1, name: '1st Year' },
    { id: 2, name: '2nd Year' },
    { id: 3, name: '3rd Year' },
    { id: 4, name: '4th Year' },
    { id: 5, name: '5th Year' },
    { id: 6, name: '6th Year' },
]
export function SelectYear({ title }: { title: string }) {
    const [open, setOpen] = React.useState(false)
    const { setYear, year } = React.useContext(formContext)

    return (
        <LabelledInput title={title}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className=" justify-between"
                    >
                        {year
                            ? years.find((y) => y.id == year)?.name
                            : 'Select year...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                    <Command>
                        <CommandInput placeholder="Search year..." />
                        <CommandEmpty>No year found.</CommandEmpty>
                        <CommandGroup>
                            {years.map((item) => (
                                <CommandItem
                                    value={item.id.toString()}
                                    key={item.id}
                                    onSelect={(currentValue) => {
                                        setYear(
                                            year === parseInt(currentValue)
                                                ? undefined
                                                : item.id
                                        )
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            year && year === item.id
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
