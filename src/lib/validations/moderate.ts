import { z } from 'zod'
export const moderationSchema = z.object({
    userId: z.string().uuid(),
    phoneNumber: z.string().min(10).max(10),
    unitId: z.string().uuid(),
})
export const moderationFormSchema = z.object({
    phoneNumber: z.string().min(10).max(10),
})
