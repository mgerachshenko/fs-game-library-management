import { Routes, Route } from "react-router-dom";
import StorePage from "./components/pages/StorePage/StorePage";
import LibraryPage from "./components/pages/LibraryPage/LibraryPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import { Layout } from "./components/layout/Layout";
import { ProfileProvider } from "./context/ProfileProvider";
import { ProfileContext } from "./context/ProfileContext";
import { useContext } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function HeaderUser() {
    const context = useContext(ProfileContext);
    if (!context) return null;

    return (
        <div className="app-user">
            <span className="app-user__name">{context.displayName}</span>
        </div>
    );
}

function AppContent() {
    return (
        <>
            <header className="app-header">
                <h1 className="app-header__title">Press Start</h1>
                <div className="app-header__right">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <HeaderUser />
                </div>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<StorePage />} />
                        <Route path="/store" element={<StorePage />} />
                        <Route path="/library" element={<LibraryPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                </Routes>
            </main>
        </>
    );
}

export default function App() {
    return (
        <ProfileProvider>
            <AppContent />
        </ProfileProvider>
    );
}
