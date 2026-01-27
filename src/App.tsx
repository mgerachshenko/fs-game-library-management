import { Routes, Route } from "react-router-dom";
import Nav from "./components/common/nav/Nav";
import StoreToolbar from "./components/StoreToolbar/StoreToolbar";
import StorePage from "./components/pages/StorePage";
import LibraryPage from "./components/pages/LibraryPage";
import ProfilePage from "./components/pages/ProfilePage";



function App() {
    return (
        <>
            <header>
                <h1>Steam Library Clone</h1>
            </header>

            <main>
                <Nav />
                <StoreToolbar />
                <Routes>
                    <Route path="/" element={<StorePage />} />
                    <Route path="/store" element={<StorePage />} />
                    <Route path="/library" element={<LibraryPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </main>

            <footer>
                <p>Team Null: Dara, Mikhail, Lance</p>
            </footer>
        </>
    );
}

export default App;
