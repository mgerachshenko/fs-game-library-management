import Nav from "./components/common/nav/Nav";
import FeaturedGames from "./components/common/FeaturedGames/FeaturedGames";
import StoreToolbar from "./components/StoreToolbar/StoreToolbar";

function App() {
    return (
        <>
            <header>
                <h1>Steam Library Clone</h1>
            </header>

            <main>
                <Nav />
                <StoreToolbar />
                <FeaturedGames />
            </main>

            <footer>
                <p>Team Null: Dara, Mikhail, Lance</p>
            </footer>
        </>
    );
}

export default App;
