import React from 'react'
import { SearchBoxProps } from 'react-instantsearch-hooks-web'
import { SearchContext } from './context'

type Props = SearchBoxProps

export default function SearchBox(props: Props) {
    const { query, refine } = React.useContext(SearchContext)
    return (
        <div>
            <input
                type="search"
                autoFocus
                placeholder="Search unit by name or code ..."
                className="bg-secondary border-2 border-secondary-200 rounded-md p-2 w-full lg:w-2/3"
                value={query}
                onChange={(e) => refine(e.target.value)}
            />
        </div>
    )
}
