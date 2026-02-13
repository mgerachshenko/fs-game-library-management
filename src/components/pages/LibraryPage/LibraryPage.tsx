import { useState } from "react";
import LibraryList from "./LibraryList";
import LibrarySearch from "./LibrarySearch";
import "./LibraryPage.css";
import { gameList } from "../../../apis/mockGameData";
import type { Game } from "../../../types/game";

export default function LibraryPage() {
    const [searchFilter, setSearchFilter] = useState("");
    const [games, setGames] = useState<Game[]>(gameList);

    return (
        <div>
            <h2>Library Page</h2>
            <div className="library-page">
                <h2>Owned Games</h2>
                <LibrarySearch
                    searchFilter={searchFilter}
                    setSearchFilter={setSearchFilter}
                />
                <LibraryList
                    games={games}
                    setGames={setGames}
                    searchFilter={searchFilter}
                />
            </div>
        </div>
    );
}

