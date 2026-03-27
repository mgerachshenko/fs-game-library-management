import prisma from "../../../../prisma/client";

export async function getGames() {
    return await prisma.game.findMany({
        orderBy: {
            title: "asc",
        },
    });
}

export async function getOwnedGames() {
    return await prisma.game.findMany({
        where: {
            isOwned: true,
        },
        orderBy: {
            title: "asc",
        },
    });
}

export async function searchGames(
    searchQuery: string,
    category?: string,
): Promise<{ isValid: boolean; errors: string[]; games: unknown[] }> {
    let isValid = true;
    const errors: string[] = [];

    if (!searchQuery || searchQuery.trim().length < 3) {
        isValid = false;
        errors.push("Search query must be at least 3 characters");
    }

    if (!isValid) {
        return { isValid, errors, games: [] };
    }

    const games = await prisma.game.findMany({
        where: {
            title: {
                contains: searchQuery.trim(),
                mode: "insensitive",
            },
            ...(category && category.toLowerCase() !== "all"
                ? {
                      category: {
                          equals: category,
                          mode: "insensitive",
                      },
                  }
                : {}),
        },
        orderBy: {
            title: "asc",
        },
    });

    return { isValid, errors, games };
}

export async function toggleOwnedGame(gameId: number) {
    const game = await prisma.game.findUnique({
        where: { id: gameId },
    });

    if (!game) {
        throw new Error("Game not found");
    }

    return await prisma.game.update({
        where: { id: gameId },
        data: {
            isOwned: !game.isOwned,
        },
    });
}
