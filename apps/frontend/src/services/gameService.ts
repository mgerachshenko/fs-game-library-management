/**
 * Mikhail's I.3 Explanation Block
 * The service works with business rules like searching and validation
 * so that the components themselves don't have to actually contain the filtering logic.
 * It receives the search input then it validates it, filters the games,
 * and then returns the results.
 */
/**
 * Lance's I.3 Explanation Block
 * This component properly implements the gameRepo because this is where all business logic is contained
 * that involves adding or removing a game from the library by having an if statement
 * that decides which function to use based on the isOwned boolean where the change is shown to be
 * reflected in the repo
 */
import * as GameApi from "../repositories/gameRepo";
import { searchService } from "./searchService";
import type { Game } from "@shared/types/game";

export async function getAllGames() {
    return await GameApi.fetchGames();
}

export async function getOwnedGames() {
    return await GameApi.fetchOwnedGames();
}

export async function getGamesBySearch(searchQuery: string, category?: string) {
    const { isValid, errors } = searchService(searchQuery, category);

    if (!isValid) {
        return { games: [] as Game[], errors };
    }

    return await GameApi.searchGames(searchQuery, category);
}

export async function fetchGames() {
    return await GameApi.fetchGames();
}

export async function fetchOwnedGames() {
    return await GameApi.fetchOwnedGames();
}

export async function toggleOwnedGame(gameId: number) {
    return await GameApi.toggleOwnedGame(gameId);
}