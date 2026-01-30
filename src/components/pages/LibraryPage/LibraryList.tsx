import type { Game } from "./LibraryPage";

interface gameSearchProps {
    games: Game[];
    searchFilter: string;
    setGames: React.Dispatch<React.SetStateAction<Game[]>>;
}

export default function LibraryList({ games, setGames, searchFilter }: gameSearchProps) {
    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchFilter.toLowerCase())
    );

    function removeGame(id: number) {
        setGames(games.filter((game) => game.id !== id));
    }

    return (
        <div className="library-grid">
            {filteredGames.map((game) => (
                <div key={game.id} className="library-card">
                    <img src={game.image} alt={game.title} />
                    <p>{game.title}</p>
                    <button onClick={() => removeGame(game.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
}

