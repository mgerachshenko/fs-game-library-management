import { Request, Response, NextFunction } from "express";
import * as gameService from "../services/gameService";
import { successResponse } from "../models/responseModel";

export const getGames = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const games = await gameService.getGames();

        res.status(200).json(
            successResponse(games, "Games retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

export const getOwnedGames = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const games = await gameService.getOwnedGames();

        res.status(200).json(
            successResponse(games, "Owned games retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

export const searchGames = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { query, category } = req.query as {
            query: string;
            category?: string;
        };

        const result = await gameService.searchGames(query, category);

        if (!result.isValid) {
            res.status(400).json({ error: result.errors[0] });
            return;
        }

        res.status(200).json(
            successResponse(result.games, "Games searched successfully")
        );
    } catch (error) {
        next(error);
    }
};

export const toggleOwnedGame = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const gameId = Number(req.params.id);

        if (Number.isNaN(gameId)) {
            res.status(400).json({ error: "Invalid game id" });
            return;
        }

        const updatedGame = await gameService.toggleOwnedGame(gameId);

        res.status(200).json(
            successResponse(updatedGame, "Game ownership updated successfully")
        );
    } catch (error) {
        next(error);
    }
};