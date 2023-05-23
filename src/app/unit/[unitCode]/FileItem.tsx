import { getIconLink } from '@/lib/fileIcons'
import { Content } from '@prisma/client'
import { Link2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function FileItem({ file }: { file: Content }) {
    const ext = file.name.split('.').pop()
    const icon = getIconLink(ext)
    return (
        <div className=" p-3 shadow-md rounded-md">
            <Link href={file.url} className="flex justify-between items-center">
                <div className="flex gap-2 items-center ">
                    <p className="text-gray-500">{file.type}</p>
                    {icon.icon && (
                        <Image
                            width={12}
                            height={6}
                            className="object-contain"
                            src={icon.icon}
                            alt={file.type}
                        />
                    )}
                    <h2 className="text-xl ">{file.name}</h2>
                </div>
                <Link2 />
            </Link>
        </div>
    )
}
