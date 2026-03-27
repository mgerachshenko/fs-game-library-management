import { PrismaClient } from "@prisma/client";
import { USER_PROFILES_TESTDATA } from "./userProfiles.seeddata";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database from test data...");

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

    console.log("Seed complete");
}

main()
    .catch((e) => {
        console.error("Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
