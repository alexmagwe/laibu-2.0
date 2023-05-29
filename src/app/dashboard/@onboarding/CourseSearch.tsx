import { algoliaClient } from '@/lib/algolia/client'
import React from 'react'
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web'

type Props = {}

function CourseSearch({}: Props) {
    return (
        <div className="max-w-lg">
            CourseSearch
            <InstantSearch searchClient={algoliaClient} indexName="units">
                <SearchBox
                    classNames={{
                        root: 'border-2 max-w-xs rounded-md  flex relative',
                        input: ' outline-none w-full p-2',
                        resetIcon:
                            'absolute hidden right-12 text-rose-500 h-2 text-slate-500 w-4 top-[50%] transform -translate-y-1/2',
                        submitIcon:
                            'absolute right-5 h-4 text-slate-500 w-4 top-[50%] transform -translate-y-1/2',
                    }}
                />
                <Hits hitComponent={Results} />
            </InstantSearch>
        </div>
    )
}

export default CourseSearch
// function SearchBox({ refine }) {
//   return (
//     <div>
//       <input
//         id="algolia_search"
//         type="search"
//         placeholder="Search for articles!"
//         onChange={(e) => refine(e.currentTarget.value)}
//       />
//     </div>
//   );
// }
function Results({ hit }: any) {
    return (
        <div>
            <h1 className="capitalize">{hit.name}</h1>
        </div>
    )
}
