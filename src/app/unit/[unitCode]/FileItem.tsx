import { Content } from '@prisma/client'
import { Link2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function FileItem({ file }: { file: Content }) {
    return (
        <div className=" p-4 bg-card shadow-md rounded-md">
            <a href={file.url} className="flex justify-between items-center">
                <div className="flex gap-2 items-center ">
                    <h2 className="text-xl ">{file.name}</h2>
                </div>
                <Link2 />
            </a>
        </div>
    )
}
