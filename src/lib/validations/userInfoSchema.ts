import { z } from 'zod'
import { User, Course } from '@prisma/client'
export type UserWithCourse =
    | (User & {
          course: Course | null
      })
    | null
