import * as GameRepo from "../repositories/gameRepo";
import type { Game } from "../types/game";

/**
 * This component properly implements the gameRepo because this is where all business logic is contained
 * that involves adding or removing a game from the library by having an if statement
 * that decides which function to use based on the isOwned boolean where the change is shown to be
 * reflected in the repo
 */

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