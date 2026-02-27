import { gameList } from "../apis/mockGameData";
import type { Game } from "../types/game";

export function fetchGames(): Game[] {
  return gameList;
}

export function getGameById(gameId: number): Game {
  const game = gameList.find((g) => g.id === gameId);
  if (!game) throw new Error("Game not found");
  return game;
}

export async function addOwnedGame(gameId: number) {
  getGameById(gameId).isOwned = true;
}

export async function removeOwnedGame(gameId: number) {
  getGameById(gameId).isOwned = false;
}