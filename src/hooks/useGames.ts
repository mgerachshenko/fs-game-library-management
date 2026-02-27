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

  return { games, errors, search };
}