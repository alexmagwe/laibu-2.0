import { z } from 'zod'
export const unitValidationSchema = z.object({
    id: z.string().uuid(),
})
