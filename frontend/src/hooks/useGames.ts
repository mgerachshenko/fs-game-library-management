/**
 * Mikhail's I.3 Explanation Block
 * The hook lets multiple pages reuse the same game logic.
 * It calls the service functions and updates React state
 * with the returned results.
 */
/**
 * Lance's I.3 Explanation Block
 * This component properly implements the service because this is where presentation logic of 
 * game and error state is all handled by fetching the games from said service
 */
import { useEffect, useState } from "react";
import * as GameService from "../services/gameService";
import type { Game } from "../types/game";

export function useGames(
    dependencies: unknown[] = [],
    filterFn?: ((game: Game) => boolean) | null
) {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    async function fetchAll() {
        try {
            const result = filterFn
                ? await GameService.fetchOwnedGames()
                : await GameService.fetchGames();

            const nextGames = filterFn ? result.filter(filterFn) : result;

            setGames(nextGames);
            setError(null);
            setErrors([]);
        } catch (e) {
            setError(String(e));
        }
    }

    async function toggleOwnedGame(gameId: number) {
        await GameService.toggleOwnedGame(gameId);
        await fetchAll();
    }

    async function search(searchText: string, category?: string) {
        const result = await GameService.getGamesBySearch(searchText, category);

        const nextGames = filterFn ? result.games.filter(filterFn) : result.games;
        setGames(nextGames);
        setErrors(result.errors);
    }

    useEffect(() => {
        fetchAll();
    }, [...dependencies]);

    return { games, error, errors, search, toggleOwnedGame };
}