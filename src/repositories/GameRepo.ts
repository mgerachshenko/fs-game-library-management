/**
 * I.3 Explanation Block
 * The repo handles the data access so the UI and services
 * don’t actually directly work with the raw data.
 * It stores the test data and provides methods like getAll and remove
 * that other layers can call.
 */
import type { Game } from "../types/game";
import { gameList } from "../apis/mockGameData";

const games: Game[] = [...gameList];

export const gameRepository = {
  getAll(): Game[] {
    return [...games];
  },

  getById(id: number): Game | undefined {
    return games.find((game) => game.id === id);
  },

  add(game: Game): void {
    games.push(game);
  },

  remove(id: number): void {
    const index = games.findIndex((game) => game.id === id);

    if (index !== -1) {
      games.splice(index, 1);
    }
  },
};