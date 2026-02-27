/**
 * I.3 Explanation Block
 * The service works with business rules like searching and validation
 * so that the components themselves don't have to actually contain the filtering logic.
 * It receives the search input then it validates it, filters the games,
 * and then returns the results.
 */
/**
 * This component properly implements the gameRepo because this is where all business logic is contained
 * that involves adding or removing a game from the library by having an if statement
 * that decides which function to use based on the isOwned boolean where the change is shown to be
 * reflected in the repo
 */
/**
 * I.3 Explanation Block
 * The service works with business rules like searching and validation
 * so that the components themselves don't have to actually contain the filtering logic.
 * It receives the search input then it validates it, filters the games,
 * and then returns the results.
 */

import * as GameRepo from "../repositories/GameRepo";
import { searchService } from "./searchService";
import type { Game } from "../types/game";

export function getAllGames() {
  return GameRepo.fetchGames();
}

export function getGamesBySearch(searchQuery: string, category?: string) {
  const { isValid, errors } = searchService(searchQuery, category);

  if (!isValid) {
    return { games: [] as Game[], errors };
  }

  const allGames = GameRepo.fetchGames();
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredGames = allGames.filter((game) => {
    const matchesTitle = game.title.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      !category ||
      category.toLowerCase() === "all" ||
      game.category.toLowerCase() === category.toLowerCase();

    return matchesTitle && matchesCategory;
  });

  return { games: filteredGames, errors: [] as string[] };
}

export async function fetchGames() {
  return GameRepo.fetchGames();
}

export async function toggleOwnedGame(gameId: number) {
  const game: Game = GameRepo.getGameById(gameId);

  if (game.isOwned) {
    await GameRepo.removeOwnedGame(gameId);
  } else {
    await GameRepo.addOwnedGame(gameId);
  }
}