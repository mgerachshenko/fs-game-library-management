import { gameList } from "../apis/mockGameData";

export function searchService(
    searchQuery: string,
    category?: string
):{
        isValid: boolean;
        errors: string[];
} {
    let isValid = true;
    const errors: string[] = [];

    if(searchQuery.trim().length < 3) {
        isValid = false;
        errors.push("Search query is too short.");
    }

    if (category) {
        const categoryExists = gameList.some(
            game => game.category.toLowerCase() === category.toLowerCase()
        );

        if (!categoryExists) {
            isValid = false;
            errors.push("Category doe not exist.");
        }
    }

    return {isValid, errors};
}