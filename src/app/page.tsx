import { getUser } from "@/lib/getUser";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await getUser();

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      {user ? (
        <Link className="bg-cyan-300 p-3 rounded-md" href="/dashboard">
          Go to Dashboard
        </Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </main>
  );
}
