import prisma from "../../../../prisma/client";

export async function getReviewsByGame(gameId: number) {
    return await prisma.review.findMany({
        where: {
            gameId
        },
        include: {
            userProfile: {
                select: {
                    id: true,
                    displayName: true
                }
            }
        },
        orderBy: {
            id: "desc"
        }
    });
}

export async function createReview(reviewData: {
    gameId: number;
    content: string;
    userProfileId: number;
}) {
    const game = await prisma.game.findUnique({
        where: { id: reviewData.gameId }
    });

    if (!game) {
        throw new Error("Game not found");
    }

    const userProfile = await prisma.userProfile.findUnique({
        where: { id: reviewData.userProfileId }
    });

    if (!userProfile) {
        throw new Error("User profile not found");
    }

    return await prisma.review.create({
        data: {
            gameId: reviewData.gameId,
            content: reviewData.content,
            userProfileId: reviewData.userProfileId
        },
        include: {
            userProfile: {
                select: {
                    id: true,
                    displayName: true
                }
            }
        }
    });
}

export async function deleteReview(reviewId: number) {
    const review = await prisma.review.findUnique({
        where: { id: reviewId }
    });

    if (!review) {
        throw new Error("Review not found");
    }

    return await prisma.review.delete({
        where: { id: reviewId }
    });
}