import { PrismaClient } from "@prisma/client";
import { gameSeedData } from "./seedData";

const prisma = new PrismaClient();

async function main() {
    await prisma.review.deleteMany();
    await prisma.game.deleteMany();
    await prisma.userProfile.deleteMany();

    const createdGames = await prisma.game.createMany({
        data: gameSeedData,
        skipDuplicates: true,
    });

    console.log(`CREATED GAMES: ${createdGames.count}`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
