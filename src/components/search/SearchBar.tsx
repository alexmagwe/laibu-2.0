'use client'
import Search from '@/components/search/Search'
import SearchContextProvider from '@/components/search/context'
import React from 'react'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import { searchClient } from '@/lib/algolia/client'

type SearchBarProps = {
    callback: (hit: any) => void
    index: string
}
export function SearchBar({ callback, index }: SearchBarProps) {
    return (
        <div className="w-full min-w-[250px]">
            <InstantSearch
                searchClient={searchClient} // this is the Algolia client
                indexName={index} // this is your index name
            >
                <SearchContextProvider callback={callback} index={index}>
                    <Search />
                </SearchContextProvider>
            </InstantSearch>
        </div>
    )
}
