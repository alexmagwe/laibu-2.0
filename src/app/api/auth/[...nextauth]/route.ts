import { authOptions } from '@/lib/auth'
import NextAuth from 'next-auth'
import crypto from 'node:crypto'
global.crypto ??= crypto
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
