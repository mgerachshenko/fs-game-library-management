import { useState } from "react";
import FeaturedGames from "./FeaturedGames/FeaturedGames";
import StoreToolbar from "./StoreToolbar/StoreToolbar";
import { useGames } from "../../../hooks/useGames";

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
            {isSearching &&
                games.map((game) => (
                    <div key={game.id}>
                        <h3>{game.title}</h3>
                    </div>
                ))}
        </>
    );
}

export default StorePage;