import { faker } from '@faker-js/faker';
import { PrismaClient, Vacancy } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const vacancies: Vacancy[] = [
        {
            id: faker.datatype.uuid(),
            localization: 'A01',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'A02',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'A03',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'A04',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'A05',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'A06',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'A07',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'A08',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'A09',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'A10',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'B01',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'B02',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'B03',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'B04',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'B05',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'B06',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'B07',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'B08',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'B09',
            occupied: false
        },
        {
            id: faker.datatype.uuid(),
            localization: 'B10',
            occupied: false
        },
    ]
    await prisma.vacancy.createMany({
        data: vacancies
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });