import { Routes, Route } from "react-router-dom";
import StorePage from "./components/pages/StorePage/StorePage";
import LibraryPage from "./components/pages/LibraryPage/LibraryPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import { useState } from "react";
import { Layout } from "./components/layout/Layout";

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
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<StorePage />} />
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
                    </Route>
                </Routes>
            </main>
        </>
    );
}

export default App;
