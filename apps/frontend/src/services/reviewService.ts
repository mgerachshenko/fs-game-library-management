import * as ReviewApi from "../repositories/reviewRepo";

export async function fetchReviewsByGame(gameId: number) {
    return await ReviewApi.getReviewsByGame(gameId);
}

export async function createReview(gameId: number, content: string) {
    return await ReviewApi.createReview(gameId, content);
}