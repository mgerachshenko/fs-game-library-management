import { useState } from "react";
import FeaturedGames from "./FeaturedGames/FeaturedGames";
import { useGames } from "../../../hooks/useGames";

/**
 * This component properly implements the hook 
 * because this is where all games props are loaded to be sent to featured games for display
 * by using useGames without a filter
 */

type ReviewsByGame = { [id: number]: string[] };

function StorePage() {
    const [reviewsByGame, setReviewsByGame] = useState<ReviewsByGame>({});
    const { games, error, toggleOwnedGame } = useGames([], null);

    if (error) return <p>{error}</p>;

    return (
        <>
            <h2>Store Page</h2>
            <FeaturedGames 
                games={games}
                toggleOwnedGame={toggleOwnedGame}
                reviewsByGame={reviewsByGame}
                setReviewsByGame={setReviewsByGame}
            />
        </>
    );
}

export default StorePage;
