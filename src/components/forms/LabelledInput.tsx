import React from 'react'

type Props = {
    title: string
    children: React.ReactNode
}

function FormInput({ title, children }: Props) {
    return (
        <div>
            <h2 className="text-sm my-3 text-gray-500 dark:text-slate-300">
                {title}
            </h2>
            {children}
        </div>
    )
}

export default FormInput
