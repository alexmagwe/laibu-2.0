import {z} from 'zod'
export const userUniversitySchema=z.object({
    course:z.object({
        id:z.string().uuid(),
        name:z.string(),
        code:z.string(),
    }),
    semester:z.number().min(1).max(2),
    year:z.number().min(1).max(6),
})
export type UserUniversitySchema=z.infer<typeof userUniversitySchema>
