import {algoliaServerClient} from "./algolia/serverClient"
import { db } from "./db"

export async function seedUnits() {
   const units=await db.unit.findMany()

   if(units.length>0){
    try{

        algoliaServerClient.initIndex("units").saveObjects(units)
    }
    catch(e){
        console.log(e)
   }
}

}
export async function seedCourses() {
    const courses=await db.course.findMany()
    if(courses.length>0){
    try{
        
        await algoliaServerClient.initIndex("courses").saveObjects(courses)
    }
    catch(e){
        console.log(e)
    }}

}
export async function seedContent() {
    const content=await db.content.findMany()
    if(content.length>0)
    try{

        await  algoliaServerClient.initIndex("content").saveObjects(content)
    }
    catch(e){
        console.log(e)
    }
}

