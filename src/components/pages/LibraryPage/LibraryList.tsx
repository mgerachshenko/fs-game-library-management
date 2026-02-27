import type { Game } from "../../../types/game";

/**
 * This component properly implements the hook 
 * because this is where all OWNED games are then displayed from the given props
 * including the function for toggling game ownership when clicking a button by having 
 * gameSearchProps interface so that LibraryList is aware of what type of data it is going to receive
 */

interface gameSearchProps {
    games: Game[];
    searchFilter: string;
    toggleOwnedGame: (gameId: number) => Promise<void>;
}

export default function LibraryList({ games, toggleOwnedGame, searchFilter }: gameSearchProps) {
    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchFilter.toLowerCase())
    );

    return (
        <div className="library-grid">
            {filteredGames.map((game) => (
                <div key={game.id} className="library-card">
                    <img src={game.image} alt={game.title} />
                    <p>{game.title}</p>
                    <button onClick={() => toggleOwnedGame(game.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
}

