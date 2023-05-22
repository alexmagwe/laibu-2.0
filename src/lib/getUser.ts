import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { db } from './db'
import toast from 'react-hot-toast'
import { cache } from 'react'

export const getUser = async () => {
    const session = await getServerSession(authOptions)
    return session?.user
}
export const getUserInfo = cache(async () => {
    try {
        const session = await getServerSession(authOptions)
        const user = await db.user.findUnique({
            where: { id: session?.user.id },
            include: {
                course: true,
            },
        })

        return user
    } catch (e) {
        console.error(e)
        return null
    }
})
