import { Unit } from '@prisma/client'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

type Props = {
    item: Unit
    pathSuffix?: string
}

export default function UnitCard({ item, pathSuffix }: Props) {
    return (
        <Link
            className="w-full sm:w-auto bg-secondary shadow-md hover:scale-105 hover:bg-accent duration-200 relative  rounded-md flex gap-2 md:items-center py-8 px-8"
            key={item.id}
            href={`/unit/${item.code}${pathSuffix || ''}`}
        >
            <div className="px-4 py-6 flex flex-col  md:items-center">
                <h2 className="text-2xl">{item.name}</h2>
                <h3 className="text-lg text-gray-500">{item.code}</h3>
                <div
                    className={clsx(
                        'rounded-lg absolute bottom-5 right-2 text-xs p-2 ',
                        item.type === 'Core'
                            ? 'bg-green-500/20 dark:bg-green-400/20 text-green-500 dark:text-green-400'
                            : 'bg-gray-300/20 dark:bg-gray-400/20 text-gray-500 dark:text-gray-400'
                    )}
                >
                    {item.type}
                </div>
            </div>
        </Link>
    )
}
