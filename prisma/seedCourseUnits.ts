import { PrismaClient } from '@prisma/client'
import data from './mti2.json'
const prisma = new PrismaClient()
async function main() {
    const course = await prisma.course.findFirst({
        where: {
            code: data.courseCode,
        },
    })
    if (course) {
        try {
            const result = await prisma.course.update({
                where: {
                    id: course.id,
                },
                include: {
                    units: true,
                },
                data: {
                    units: {
                        create: data.units.map((unit) => ({
                            name: unit.course_title,
                            code: unit.code.replace(/\s/g, ''),
                            type: unit.type,
                            semester: unit.semester,
                            year: unit.year,
                        })),
                    },
                },
            })

            console.log(`successfully added units`)
        } catch (e) {
            console.log(e)
        }
    } else {
        try {
            const result = await prisma.course.create({
                include: {
                    units: true,
                },
                data: {
                    code: data.courseCode,
                    name: data.courseName,
                    units: {
                        create: data.units.map((unit) => ({
                            name: unit.course_title,
                            code: unit.code.replace(/\s/g, ''),
                            type: unit.type,
                            semester: unit.semester,
                            year: unit.year,
                        })),
                    },
                },
            })

            console.log(`successfully created course and seeded units`)
        } catch (e) {
            console.log(e)
        }
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
