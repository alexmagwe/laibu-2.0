import Search from '@/components/search/Search'
import { Unit } from '@prisma/client'
import React from 'react'
import { useHits, useSearchBox } from 'react-instantsearch-hooks-web'

type Props = {
    index: string
    children: React.ReactNode
    callback: (x: any) => void
}

export type SearchContextType<T> = {
    query: string
    hits: T[]
    clear: () => void
    refine: (query: string) => void
    callback: (data: T) => void
}
export const SearchContext = React.createContext<SearchContextType<any>>({
    query: '',
    refine: () => {},
    hits: [],
    clear: () => {},
    callback: () => {},
})
export default function SearchBar({ index, callback, children }: Props) {
    const { query, refine, clear } = useSearchBox()
    const { hits } = useHits<Unit>()

    return (
        <div className="flex flex-col gap-2">
            <SearchContext.Provider
                value={{ callback, query, refine, hits, clear }}
            >
                {children}
            </SearchContext.Provider>
        </div>
    )
}
