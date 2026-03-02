/**
 * Lance's I.3 Explanation Block
 * This component properly implements the hook 
 * because this is where all games props are loaded to be sent to library list for display
 * by using useGames with a filter which is the ownership status of the games
 */

import { useState } from "react";
import LibraryList from "./LibraryList";
import StoreToolbar from "../StorePage/StoreToolbar/StoreToolbar";
import "./LibraryPage.css";
import type { Game } from "../../../types/game";
import { useGames } from "../../../hooks/useGames";

export default function LibraryPage() {
    const [searchFilter, setSearchFilter] = useState("");
    const ownedGame = (g: Game) => g.isOwned;
    const { games, error, toggleOwnedGame } = useGames([], ownedGame);

    if (error) return <p>{error}</p>;

    function handleSearch(query: string, _categoryId: string) {
        setSearchFilter(query);
    }

    return (
        <div>
            <h2>Library Page</h2>
            <div className="library-page">
                <h2>Owned Games</h2>
                <StoreToolbar onSearch={handleSearch} />
                <LibraryList
                    games={games}
                    searchFilter={searchFilter}
                    toggleOwnedGame={toggleOwnedGame}
                />
            </div>
        </div>
    );
}