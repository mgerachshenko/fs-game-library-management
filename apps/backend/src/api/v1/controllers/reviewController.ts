import { Request, Response } from "express";
import * as reviewService from "../services/reviewService";
import { successResponse, errorResponse } from "../models/responseModel";

export const getReviewsByGame = async (req: Request, res: Response) => {
    try {
        const gameId = Number(req.params.gameId);

        const reviews = await reviewService.getReviewsByGame(gameId);

        return res.json(successResponse(reviews));
    } catch (error) {
        return res.status(500).json(errorResponse("Failed to fetch reviews"));
    }
};

export const createReview = async (req: Request, res: Response) => {
    try {
        const { gameId, content } = req.body;

        // MG: hardcoded user, needs to be changed when auth is added
        const userProfileId = "u1";

        const newReview = await reviewService.createReview({
            gameId,
            content,
            userProfileId
        });

        return res.status(201).json(successResponse(newReview, "Review created"));
    } catch (error) {
        return res.status(500).json(errorResponse("Failed to create review"));
    }
};

export const deleteReview = async (req: Request, res: Response) => {
    try {
        const reviewId = Number(req.params.id);

        await reviewService.deleteReview(reviewId);

        return res.json(successResponse(null, "Review deleted"));
    } catch (error) {
        return res.status(500).json(errorResponse("Failed to delete review"));
    }
};