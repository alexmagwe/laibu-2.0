import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth/next'

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        console.log(session)
        if (!session?.user)
            return new Response(JSON.stringify({ error: 'unauthorized' }), {
                status: 401,
            })

        const user = await db.user.findUnique({
            where: { id: session.user.id },
            include: {
                course: true,
            },
        })
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (e) {
        return new Response(null, {
            status: 500,
        })
    }
}
