import React from 'react'
import FileContent, { ContentSkeleton } from './FileContent'
import { getUnit } from './layout'
import EmptyContent from '@/components/ui/emptyContent'
import { Unit, UserModeratingUnit } from '@prisma/client'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
type Props = {
    params: {
        unitCode: string
    }
}

async function page({ params }: Props) {
    const data = await getUnit(params.unitCode)

    return (
        <div className="p-4">
            {data?.moderators.length == 0 && <Banner unit={data} />}
            <React.Suspense fallback={<ContentSkeleton />}>
                {/* @ts-expect-error Server Component */}
                <FileContent unit={data} />
            </React.Suspense>
        </div>
    )
}

export default page

type BannerProps = {
    unit:
        | (Unit & {
              moderators: UserModeratingUnit[]
          })
        | null
}

function Banner({ unit }: BannerProps) {
    return (
        <div className="bg-purple-600 rounded-md text-slate-100 border-2 mb-6 p-4">
            <h2 className="text-xl text-center flex flex-col items-center">
                <p>
                    There is one more slot remaining to Become a moderator for
                    this unit,
                </p>
                {unit?.moderators.length == 0 && (
                    <Link
                        href="/unit/${unit.code}/moderate"
                        className="text-yellow-400 text-center items-center flex gap-2 dark:text-yelllow-300"
                    >
                        <span>click here to apply</span>
                        <Sparkles />
                    </Link>
                )}
            </h2>
        </div>
    )
}
