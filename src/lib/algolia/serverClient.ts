import algoliaSearch from 'algoliasearch'
import { serverEnv } from '../serverEnv'
export const algoliaServerClient = algoliaSearch(
    serverEnv.NEXT_PUBLIC_ALGOLIA_APP_ID,
    serverEnv.ALGOLIA_SEARCH_ADMIN_KEY
)
