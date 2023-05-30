import React from 'react'
import { SearchBoxProps } from 'react-instantsearch-hooks-web'
import { SearchContext } from './context'
import { Input } from '../ui/input'

type Props = SearchBoxProps

export default function SearchBox(props: Props) {
    const { query, refine } = React.useContext(SearchContext)
    return (
        <div>
            <Input
                type="search"
                autoFocus
                placeholder="Search unit by name or code ..."
                className=" bg-secondary w-full"
                value={query}
                onChange={(e) => refine(e.target.value)}
            />
        </div>
    )
}
