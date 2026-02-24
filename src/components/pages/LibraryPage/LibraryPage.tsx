import { useState } from "react";
import LibraryList from "./LibraryList";
import LibrarySearch from "./LibrarySearch";
import "./LibraryPage.css";
import { gameList } from "../../../apis/mockGameData";
import type { Game } from "../../../types/game";
import { useTextInput } from "../../../hooks/useTextInput"; 

export default function LibraryPage() {
    const searchInput = useTextInput("");
    const [games, setGames] = useState<Game[]>(gameList);

    return (
        <div>
            <h2>Library Page</h2>
            <div className="library-page">
                <h2>Owned Games</h2>
                <LibrarySearch
                    searchFilter={searchInput.value}    
                    setSearchFilter={searchInput.setValue} 
                />
                <LibraryList
                    games={games}
                    setGames={setGames}
                    searchFilter={searchInput.value} 
                />
            </div>
        </div>
    );
}

