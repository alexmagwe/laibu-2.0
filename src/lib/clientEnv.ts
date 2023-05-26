import { z } from 'zod'
const clientSchema = z.object({
    NEXT_PUBLIC_ALGOLIA_APP_ID: z.string(),
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: z.string(),
})
const clientparsed = clientSchema.safeParse(process.env)
if (!clientparsed.success) {
    throw new Error(clientparsed.error.message)
}

export const clientEnv = clientparsed.data
