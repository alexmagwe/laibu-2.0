import {z} from 'zod'

const serverSchema=z.object({
    NEXT_PUBLIC_ALGOLIA_APP_ID:z.string(),
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY:z.string(),
    ALGOLIA_SEARCH_ADMIN_KEY:z.string()
})
const serverparsed=serverSchema.safeParse(process.env)

if(!serverparsed.success){
    throw new Error(serverparsed.error.message)
}

export const serverEnv=serverparsed.data
