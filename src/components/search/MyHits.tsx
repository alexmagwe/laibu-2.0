import React from 'react'
import { Unit } from '@prisma/client'
import {
    useRefinementList,
    UseRefinementListProps,
    Hits,
    useHits,
    useSearchBox,
} from 'react-instantsearch-hooks-web'
import { Button } from '../ui/button'
import { SearchContext } from './context'
type Props = {}
export default function MyHits(props: Props) {
    const { query, refine, hits, clear, callback } =
        React.useContext(SearchContext)
    const handleClick = (hit: Unit) => {
        if (hit) {
            callback(hit)
            clear()
        }
    }
    return (
        <div className=" max-h-96 absolute z-50 mt-3 overflow-auto ">
            {hits?.length === 0 && <p>No results found!</p>}

            {hits?.length > 0 && (
                <div className="flex flex-col w-full bg-secondary p-2 rounded-md divide-y-2 gap-3">
                    {hits.map((hit, index) => (
                        <Button
                            onClick={() => {
                                handleClick(hit)
                            }}
                            className="flex flex-col h-full bg-secondary gap-2"
                            tabIndex={index}
                            key={hit.objectID}
                        >
                            <p className="text-xl">{hit.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {hit.code}
                            </p>
                        </Button>
                    ))}
                </div>
            )}
        </div>
    )
}
