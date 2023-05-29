import algoliaSearch, { SearchClient } from 'algoliasearch'

export const algoliaClient = algoliaSearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? ''
)
export const searchClient: SearchClient = {
    ...algoliaClient,
    search(requests) {
        if (requests.every(({ params }) => !params?.query)) {
            return Promise.resolve({
                results: requests.map(() => ({
                    hits: [],
                    hitsPerPage: 0,
                    query: '',
                    exhaustiveNbHits: true,
                    params: '',
                    nbHits: 0,
                    nbPages: 0,
                    page: 0,
                    processingTimeMS: 0,
                })),
            })
        }

        return algoliaClient.search(requests)
    },
}
