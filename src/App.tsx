import { Routes, Route } from "react-router-dom";
import Nav from "./components/common/nav/Nav";
import StoreToolbar from "./components/pages/StorePage/StoreToolbar/StoreToolbar";
import StorePage from "./components/pages/StorePage/StorePage";
import LibraryPage from "./components/pages/LibraryPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import { useState } from "react";

function App() {
    const [displayName, setDisplayName] = useState("PlayerOne");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    return (
        <>
            <header>
                <h1>Steam Library Clone</h1>
                <div className="app-user">
                    <span className="app-user__name">{displayName}</span>
                </div>
            </header>

            <main>
                <Nav />
                <StoreToolbar />
                <Routes>
                    <Route path="/" element={<StorePage />} />
                    <Route path="/store" element={<StorePage />} />
                    <Route path="/library" element={<LibraryPage />} />
                    <Route
                        path="/profile"
                        element={
                            <ProfilePage
                                name="{Dara W}"
                                displayName={displayName}
                                setDisplayName={setDisplayName}
                                bio={bio}
                                setBio={setBio}
                                avatarUrl={avatarUrl}
                                setAvatarUrl={setAvatarUrl}
                            />
                        }
                    />
                </Routes>
            </main>

            <footer>
                <p>Team Null: Dara, Mikhail, Lance</p>
            </footer>
        </>
    );
}

export default App;
