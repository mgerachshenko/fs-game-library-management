import { gameList } from "../apis/mockGameData";

export function searchService(
  searchQuery: string,
  category?: string
): {
  isValid: boolean;
  errors: string[];
} {
  let isValid = true;
  const errors: string[] = [];

  if (searchQuery.trim().length < 3) {
    isValid = false;
    errors.push("Search query is too short.");
  }

  if (category) {
    const normalizedCategory = category.toLowerCase();

    if (normalizedCategory !== "all") {
      const categoryExists = gameList.some(
        (game) => game.category.toLowerCase() === normalizedCategory
      );

      if (!categoryExists) {
        isValid = false;
        errors.push("Category does not exist.");
      }
    }
  }

  return { isValid, errors };
}