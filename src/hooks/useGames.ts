/**
 * I.3 Explanation Block
 * The hook lets multiple pages reuse the same game logic.
 * It calls the service functions and updates React state
 * with the returned results.
 */
import { useState } from "react";
import type { Game } from "../types/game";
import { getAllGames, getGamesBySearch } from "../services/gameService";

export function useGames() {
  const [games, setGames] = useState<Game[]>(() => getAllGames());
  const [errors, setErrors] = useState<string[]>([]);

  function search(searchText: string, category?: string) {
    const result = getGamesBySearch(searchText, category);
    setGames(result.games);
    setErrors(result.errors);
  }

  function removeGame(id: number) {
    setGames((prevGames) => prevGames.filter((game) => game.id !== id));
  }

  return { games, errors, search, removeGame };
}