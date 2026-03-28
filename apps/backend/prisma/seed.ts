import { PrismaClient } from "@prisma/client";
import { gameSeedData, profileSeedData } from "./seedData";

const prisma = new PrismaClient();

async function main() {
    await prisma.review.deleteMany();
    await prisma.userProfile.deleteMany();
    await prisma.game.deleteMany();

    const createdProfiles = await prisma.userProfile.createMany({
        data: profileSeedData,
        skipDuplicates: true
    });

    const createdGames = await prisma.game.createMany({
        data: gameSeedData,
        skipDuplicates: true
    });

    console.log(`CREATED PROFILES: ${createdProfiles.count}`);
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