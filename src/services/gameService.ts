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

        const matchesCategory = category
            ? game.category.toLowerCase() === category.toLowerCase()
            : true;

        return matchesTitle && matchesCategory;
    });

    return { games: filteredGames, errors: [] };
}