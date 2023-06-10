import { ContentVariant } from '@prisma/client'
import { z } from 'zod'

//save file data to db
export const uploadedFileResolver = z.object({
    unitId: z.string().uuid(),
    data: z.array(
        z.object({
            name: z.string(),
            uploadURL: z.string(),
            size: z.number(),
            meta: z.object({
                name: z.string(),
                unitCode: z.string(),
                unitId: z.string(),
                variant: z.nativeEnum(ContentVariant).optional(),
            }),
        })
    ),
})

export const saveContent = async (data: any) => {
    try {
        const payload = uploadedFileResolver.parse(data)

        const resp = await fetch(`/api/${payload.unitId}/content`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (resp.status === 201) return true
        else return false
    } catch (e) {
        if (e instanceof z.ZodError) {
            console.log(e.issues)
            return false
        }
        console.log(e)
        return false
    }
}
