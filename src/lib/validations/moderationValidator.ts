import { z } from 'zod'
export const moderationSchema = z.object({
    userId: z.string(),
    phoneNumber: z.string().min(10).max(10),
    courseId: z.string().uuid(),
    year: z.number().min(1).max(6),
})
export const moderationFormSchema = z.object({
    phoneNumber: z.string().min(10).max(10),
})
