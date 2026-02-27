import { useEffect, useState } from "react";
import * as GameService from "../services/gameService";
import type { Game } from "../types/game";

/**
 * This component properly implements the service because this is where presentation logic of 
 * game and error state is all handled by fetching the games from said service
 */

export function useGames(
  dependencies: unknown[],
  filterFn?: ((game: Game) => boolean) | null
) {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function fetchAll() {
    try {
      let result = await GameService.fetchGames();
      if (filterFn) result = result.filter(filterFn);
      setGames(result);
    } catch (e) {
      setError(String(e));
    }
  }

  async function toggleOwnedGame(gameId: number) {
    await GameService.toggleOwnedGame(gameId);
    await fetchAll();
  }

  useEffect(() => {
    fetchAll();
  }, [...dependencies]);

  return { games, error, toggleOwnedGame };
}