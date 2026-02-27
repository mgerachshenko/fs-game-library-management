/**
 * I.3 Explanation Block
 * This component should only be rendering and not working with the data logic.
 * It uses the useGames hook which connects to the service
 * and repo layers.
 */
import { useState } from "react";
import FeaturedGames from "./FeaturedGames/FeaturedGames";
import StoreToolbar from "./StoreToolbar/StoreToolbar";
import { useGames } from "../../../hooks/useGames";
import type { Game } from "../../../types/game.ts";

type ReviewsByGame = { [id: number]: string[] };

function StorePage() {
    const [reviewsByGame, setReviewsByGame] = useState<ReviewsByGame>({});
    const { games, search } = useGames();
    const [isSearching, setIsSearching] = useState(false);

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
            <h2>Store Page</h2>
            <StoreToolbar onSearch={handleSearch} />
            {!isSearching && (
                <FeaturedGames
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