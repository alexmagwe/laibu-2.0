import { PrismaClient } from '@prisma/client'
import data from './mti2.json'
const prisma = new PrismaClient()
async function main() {
    const result = await prisma.course.update({
        where: {
            id: '8596007f-2ecc-470a-bf20-eaccba28f9a1',
        },
        data: {
            units: {
                create: data.map((unit) => ({
                    name: unit.course_title,
                    code: unit.code,
                    type: unit.type,
                    semester: unit.semester,
                    year: unit.year,
                })),
            },
        },
    })
    console.log(`successfully added units`)
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
