import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import Sidebar, { SidebarLink } from '@/components/sidebar/UnitSidebar'
import { BrainCog, FileText, Layers } from 'lucide-react'
import React from 'react'
import { getUnit } from './getUnit'

type Props = {
    children: React.ReactNode
    params: {
        unitCode: string
    }
}

export async function generateMetadata({
    params,
}: {
    params: { unitCode: string }
}) {
    const unit = await getUnit(decodeURI(params.unitCode))

    return {
        title: unit?.code,
        description: unit?.name,
        keywords: [unit?.code ?? '', unit?.name ?? ''],
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
                    <Sidebar navigation={navigation} unit={unit} />
                    <div className="flex-1">
                        <DashboardNavbar />
                        <div className="p-4 bg-background">{children}</div>
                    </div>
                </div>
            ) : (
                <div>{children}</div>
            )}
        </main>
    )
}

export default layout
