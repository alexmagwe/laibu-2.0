import { z } from 'zod'
export const studentOnboardingSchema = z.object({
    course: z.object({
        id: z.string(),
        name: z.string(),
        code: z.string(),
    }),
    year: z.number(),
    semester: z.number(),
})
