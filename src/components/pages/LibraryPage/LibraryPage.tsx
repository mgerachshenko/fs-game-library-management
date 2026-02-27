import LibraryList from "./LibraryList";
import StoreToolbar from "../StorePage/StoreToolbar/StoreToolbar";
import "./LibraryPage.css";
import { useGames } from "../../../hooks/useGames";

export default function LibraryPage() {
    const { games, search, removeGame } = useGames();
    function handleSearch(query: string, categoryId: string) {
        const trimmed = query.trim();

        if (trimmed.length === 0) {
            return;
        }
        search(trimmed, categoryId);
    }

    return (
        <div>
            <h2>Library Page</h2>
            <div className="library-page">
                <h2>Owned Games</h2>
                <StoreToolbar onSearch={handleSearch} />
                <LibraryList
                    games={games}
                    removeGame={removeGame}
                />
            </div>
        </div>
    );
}

