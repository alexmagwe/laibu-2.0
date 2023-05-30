import { db } from '../db'
import * as dotenv from 'dotenv'
import algoliaSearch from 'algoliasearch'

// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { serverEnv } from '../serverEnv'
export const algoliaServerClient = algoliaSearch(
    serverEnv.NEXT_PUBLIC_ALGOLIA_APP_ID,
    serverEnv.ALGOLIA_SEARCH_ADMIN_KEY
)

export async function indexUnits() {
    const units = await db.unit.findMany()
    console.log(units.length, 'units found')

    if (units.length > 0) {
        try {
            await algoliaServerClient.initIndex('units').replaceAllObjects(
                units.map((unit) => {
                    return {
                        ...unit,
                        objectID: unit.id,
                    }
                })
            )
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
    return false
}
async function main() {
    const res = await indexUnits()
    if (res) console.log('successfully indexed units')
    else console.log('failed to index units')
}
main()
    .then(() => {
        process.exit(0)
    })
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
