/**
 * I.3 Explanation Block
 * The service works with business rules like searching and validation
 * so that the components themselves don't have to actually contain the filtering logic.
 * It receives the search input then it validates it, filters the games,
 * and then returns the results.
 */
import { gameRepository } from "../repositories/GameRepo";
import { searchService } from "./searchService";

export function getAllGames() {
    return gameRepository.getAll();
}

export function getGamesBySearch(
    searchQuery: string,
    category?: string
) {
    const { isValid, errors } = searchService(searchQuery, category);

    if (!isValid) {
        return { games: [], errors };
    }

    const allGames = gameRepository.getAll();
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filteredGames = allGames.filter(game => {
        const matchesTitle =
            game.title.toLowerCase().includes(normalizedQuery);

        const matchesCategory =
            !category ||
            category.toLowerCase() === "all" ||
            game.category.toLowerCase() === category.toLowerCase();

        return matchesTitle && matchesCategory;
    });

    return { games: filteredGames, errors: [] };
}