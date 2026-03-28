const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const REVIEW_ENDPOINT = "/reviews";

type ReviewResponseJSON<T> = {
    message: string;
    data: T;
};

export async function getReviewsByGame(gameId: number) {
    const response: Response = await fetch(
        `${BASE_URL}${REVIEW_ENDPOINT}/game/${gameId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch reviews");
    }

    const json: ReviewResponseJSON<any> = await response.json();
    return json.data;
}

export async function createReview(gameId: number, content: string) {
    const response: Response = await fetch(
        `${BASE_URL}${REVIEW_ENDPOINT}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                gameId,
                content
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create review");
    }

    const json: ReviewResponseJSON<any> = await response.json();
    return json.data;
}