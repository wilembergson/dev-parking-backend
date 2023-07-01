import { faker } from '@faker-js/faker';
import { PrismaClient, Vacancy } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const vacancies: Vacancy[] = [
        {
            id: faker.datatype.uuid(),
            localization: 'C01',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C02',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C03',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C04',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C05',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C06',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C07',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C08',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C09',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C10',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C11',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C12',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C13',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C14',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C15',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C16',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C17',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C18',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C19',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'C20',
            occupied: false,
            type: 'CAR'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'M01',
            occupied: false,
            type: 'MOTOCYCLE'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'M02',
            occupied: false,
            type: 'MOTOCYCLE'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'M03',
            occupied: false,
            type: 'MOTOCYCLE'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'M04',
            occupied: false,
            type: 'MOTOCYCLE'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'M05',
            occupied: false,
            type: 'MOTOCYCLE'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'M06',
            occupied: false,
            type: 'MOTOCYCLE'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'M07',
            occupied: false,
            type: 'MOTOCYCLE'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'M08',
            occupied: false,
            type: 'MOTOCYCLE'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'M09',
            occupied: false,
            type: 'MOTOCYCLE'
        },
        {
            id: faker.datatype.uuid(),
            localization: 'M10',
            occupied: false,
            type: 'MOTOCYCLE'
        }
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