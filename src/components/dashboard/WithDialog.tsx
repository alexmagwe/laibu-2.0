'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

type Props = {
    title: string
    description: React.ReactNode
    triggerText?: React.ReactNode
    triggerIcon?: boolean
    buttonText: string
    open?: boolean
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    callback?: () => void
    children: React.ReactNode
}

export default function WithDialog({
    title,
    description,
    triggerIcon,
    triggerText,
    open,
    setOpen,
    children,
    buttonText,

    callback,
}: Props) {
    return (
        <Dialog open={open && open} onOpenChange={setOpen && setOpen}>
            <DialogTrigger className="p-2 rounded-md bg-primary text-primary-foreground">
                {triggerIcon ? (
                    <Plus />
                ) : (
                    <span className="px-4 py-2">{triggerText}</span>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
            {callback && (
                <DialogFooter>
                    <Button onClick={callback}>{buttonText}</Button>
                </DialogFooter>
            )}
        </Dialog>
    )
}
