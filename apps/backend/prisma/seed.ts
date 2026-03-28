import { PrismaClient } from "@prisma/client";
import { USER_PROFILES_TESTDATA } from "./userProfiles.seeddata";
import { gameSeedData, profileSeedData } from "./seedData";

const prisma = new PrismaClient();

async function seedUserData() {
    console.log("Seeding User Profiles.");
    for (const user of USER_PROFILES_TESTDATA) {
        await prisma.userProfile.upsert({
            where: { id: user.id },
            update: {},
            create: {
                id: user.id,
                name: user.name,
                displayName: user.displayName,
                bio: user.bio,
                avatarUrl: user.avatarUrl,
                updatedAt: new Date(),
            },
        });
    }
}

async function seedGameData() {
    console.log("Seeding Games.");

    // seeding user profiles
    const createdProfiles = await prisma.userProfile.createMany({
        data: profileSeedData,
        skipDuplicates: true,
    });

    //seeding games
    const createdGames = await prisma.game.createMany({
        data: gameSeedData,
        skipDuplicates: true,
    });

    console.log(`CREATED PROFILES: ${createdProfiles.count}`);
    console.log(`CREATED GAMES: ${createdGames.count}`);
}

async function main() {
    console.log("Starting Global Seed...");

    await prisma.game.deleteMany();
    await prisma.userProfile.deleteMany();

    await seedUserData();

    await seedGameData();

    console.log("All seeding complete!");
}

main()
    .catch((e) => {
        console.error("Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
