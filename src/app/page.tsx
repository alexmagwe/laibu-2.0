import { getAuthUser } from '@/lib/user'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
    const user = await getAuthUser()

    return (
        <main className="flex min-h-screen flex-col items-center  p-24">
            {user ? (
                <Link className=" p-3 rounded-md" href="/dashboard">
                    Go to Dashboard
                </Link>
            ) : (
                <Link href="/login">Login</Link>
            )}
        </main>
    )
}
