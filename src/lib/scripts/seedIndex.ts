import { algoliaServerClient } from '../algolia/serverClient'
import { db } from '../db'

export async function indexCourses() {
    const courses = await db.course.findMany()
    if (courses.length > 0) {
        try {
            await algoliaServerClient.initIndex('courses').saveObjects(courses)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
    return false
}
export async function indexContent() {
    const content = await db.content.findMany()
    if (content.length > 0)
        try {
            await algoliaServerClient.initIndex('content').saveObjects(content)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    return false
}
