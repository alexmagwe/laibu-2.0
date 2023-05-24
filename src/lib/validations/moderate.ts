import { z } from 'zod'
export const moderationSchema = z.object({
    userId: z.string().uuid(),
    phoneNumber: z.string().min(10).max(10),
    courseId: z.string().uuid(),
    year: z.number().min(1).max(1),
})
export const moderationFormSchema = z.object({
    phoneNumber: z.string().min(10).max(10),
})
