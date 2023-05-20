
import algoliaSearch from 'algoliasearch'

export const algoliaClient=algoliaSearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID??'',process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY??'')
