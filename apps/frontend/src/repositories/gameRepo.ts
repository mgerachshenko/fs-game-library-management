import type { Game } from "@shared/types/game";

type GameResponseJSON<T> = {
    message: string;
    data: T;
};

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const GAME_ENDPOINT = "/games";

export async function fetchGames(): Promise<Game[]> {
    const gameResponse: Response = await fetch(
        `${BASE_URL}${GAME_ENDPOINT}`
    );

    if (!gameResponse.ok) {
        throw new Error("Failed to fetch games");
    }

    const json: GameResponseJSON<Game[]> = await gameResponse.json();
    return json.data;
}

export async function fetchOwnedGames(): Promise<Game[]> {
    const gameResponse: Response = await fetch(
        `${BASE_URL}${GAME_ENDPOINT}/owned`
    );

    if (!gameResponse.ok) {
        throw new Error("Failed to fetch owned games");
    }

    const json: GameResponseJSON<Game[]> = await gameResponse.json();
    return json.data;
}

export async function searchGames(
    searchQuery: string,
    category?: string
): Promise<{ games: Game[]; errors: string[] }> {
    const params = new URLSearchParams({
        query: searchQuery
    });

    if (category) {
        params.append("category", category);
    }

    const searchResponse: Response = await fetch(
        `${BASE_URL}${GAME_ENDPOINT}/search?${params.toString()}`
    );

    if (!searchResponse.ok) {
        return {
            games: [],
            errors: ["Failed to search games"]
        };
    }

    const json: GameResponseJSON<Game[]> = await searchResponse.json();

    return {
        games: json.data,
        errors: []
    };
}

export async function toggleOwnedGame(gameId: number): Promise<Game> {
    const toggleResponse: Response = await fetch(
        `${BASE_URL}${GAME_ENDPOINT}/${gameId}/toggle-owned`,
        {
            method: "PATCH"
        }
    );

    if (!toggleResponse.ok) {
        throw new Error("Failed to update game ownership");
    }

    const json: GameResponseJSON<Game> = await toggleResponse.json();
    return json.data;
}