import { algoliaClient, searchClient } from '@/lib/algolia/client'
import React, { useCallback } from 'react'
import SearchBox from './SearchBox'
import { Hits, InstantSearch } from 'react-instantsearch-hooks-web'
import MyHits from './MyHits'

type Props = {}

export default function Search({}: Props) {
    return (
        <div className="relative w-full  ">
            <SearchBox />
            <Hits hitComponent={MyHits} />
        </div>
    )
}
