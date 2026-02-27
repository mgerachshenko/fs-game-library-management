import type { Game } from "../../../types/game";

interface gameSearchProps {
    games: Game[];
    removeGame: (id: number) => void;
}

export default function LibraryList({ games, removeGame }: gameSearchProps) {
    return (
        <div className="library-grid">
            {games.map((game) => (
                <div key={game.id} className="library-card">
                    <img src={game.image} alt={game.title} />
                    <p>{game.title}</p>
                    <button onClick={() => removeGame(game.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
}

