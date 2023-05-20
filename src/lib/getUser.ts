import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

export const getUser = async () => {
    const session=await getServerSession(authOptions)
    return session?.user

}