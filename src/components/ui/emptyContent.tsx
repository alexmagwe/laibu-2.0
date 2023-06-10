import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import empty from '@public/assets/empty.png'

type Props = {
    caption: string
    link?: {
        show: boolean
        link: string
        text: string
    }
}

export default function EmptyContent({ caption, link }: Props) {
    return (
        <div>
            <div className="p-4 w-full flex flex-col gap-4 items-center justify-center">
                <Image
                    src={empty.src}
                    alt="empty content"
                    width={150}
                    height={150}
                />
                <h2 className="text-xl text-center">
                    <p>{caption}</p>
                    {link && link.show && (
                        <Link
                            href={link.link}
                            className="text-purple-600 dark:text-purple-400"
                        >
                            &nbsp;{link.text}
                        </Link>
                    )}
                </h2>
            </div>
        </div>
    )
}
