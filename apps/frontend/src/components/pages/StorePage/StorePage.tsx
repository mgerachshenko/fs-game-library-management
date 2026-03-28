/**
 * Mikhail's I.3 Explanation Block
 * This component should only be rendering and not working with the data logic.
 * It uses the useGames hook which connects to the service
 * and repo layers.
 */
/** 
 * Lance's I.3 Explanation Block
 * This component properly implements the hook 
 * because this is where all games props are loaded to be sent to featured games for display
 * by using useGames without a filter
 */
import { useEffect, useState } from "react";
import FeaturedGames from "./FeaturedGames/FeaturedGames";
import StoreToolbar from "./StoreToolbar/StoreToolbar";
import { useGames } from "../../../hooks/useGames";
import { fetchReviewsByGame } from "../../../services/reviewService";
import type { Game } from "@shared/types/game";

type Review = {
    id: number;
    content: string;
};

type ReviewsByGame = { [id: number]: Review[] };

function StorePage() {
    const [reviewsByGame, setReviewsByGame] = useState<ReviewsByGame>({});
    const [isSearching, setIsSearching] = useState(false);

    const { games, error, search, toggleOwnedGame } = useGames([], null);

    useEffect(() => {
        async function loadReviews() {
            const reviewMap: ReviewsByGame = {};

            for (const game of games) {
                try {
                    const reviews = await fetchReviewsByGame(game.id);
                    reviewMap[game.id] = reviews;
                } catch (error) {
                    reviewMap[game.id] = [];
                }
            }

            setReviewsByGame(reviewMap);
        }

        if (games.length > 0) {
            loadReviews();
        }
    }, [games]);

    if (error) return <p>{error}</p>;

    function handleSearch(query: string, categoryId: string) {
        const trimmed = query.trim();

        if (trimmed.length === 0) {
            setIsSearching(false);
            return;
        }

        search(trimmed, categoryId);
        setIsSearching(true);
    }

    return (
        <>
            <h2>Store</h2>
            <StoreToolbar onSearch={handleSearch} />
            {!isSearching && (
                <FeaturedGames
                    games={games}
                    toggleOwnedGame={toggleOwnedGame}
                    reviewsByGame={reviewsByGame}
                    setReviewsByGame={setReviewsByGame}
                />
            )}
            {isSearching && (
                <section className="featured-games">
                    <h2>Search Results</h2>
                    <ul className="featured-games-list" tabIndex={0}>
                        {games.map((game: Game) => (
                            <li
                                key={game.id}
                                className="featured-game-card"
                            >
                                <img
                                    src={game.image}
                                    alt={game.title}
                                />
                                <span className="game-title">
                                    {game.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </>
    );
}

export default StorePage;