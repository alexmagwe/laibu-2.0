import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import Sidebar, { SidebarLink } from '@/components/sidebar/UnitSidebar'
import { db } from '@/lib/db'
import { BrainCog, FileText, Layers } from 'lucide-react'
import React, { cache } from 'react'

type Props = {
    children: React.ReactNode
    params: {
        unitCode: string
    }
}

export const getUnit = cache(async (unitCode: string) => {
    return await db.unit.findUnique({
        where: {
            code: decodeURI(unitCode),
        },
    })
})
export async function generateMetadata({
    params,
}: {
    params: { unitCode: string }
}) {
    const unit = await getUnit(decodeURI(params.unitCode))

    return {
        title: unit?.code,
        description: unit?.name,
        keywords: [unit?.code, unit?.name],
    }
}

async function layout({ children, params }: Props) {
    const navigation: SidebarLink[] = [
        {
            name: 'Content',
            href: `/unit/${params.unitCode}`,
            icon: <Layers />,
        },
        {
            name: 'Practice',
            href: `/unit/${params.unitCode}/practice`,
            icon: <FileText />,
        },
        {
            name: 'Tutor',
            href: `/unit/${params.unitCode}/tutor`,
            icon: <BrainCog />,
        },
    ]
    const unit = await getUnit(params.unitCode)
    return (
        <main className="">
            {unit ? (
                <div className="flex">
                    {/* @ts-expect-error Server Component */}
                    <Sidebar navigation={navigation} unit={unit} />
                    <div className="flex-1">
                        <DashboardNavbar />
                        {children}
                    </div>
                </div>
            ) : (
                <div>{children}</div>
            )}
        </main>
    )
}

export default layout
