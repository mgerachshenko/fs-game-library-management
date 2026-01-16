import "./FeaturedGames.css";

type FeaturedGame = {
  id: number;
  title: string;
  image: string;
};

function FeaturedGames() {
  const featuredGames: FeaturedGame[] = [
    { id: 1, title: "EarthBound", image: "/EB.jpg" },
    { id: 2, title: "The Legend of Zelda", image: "/LOZOOT.jpg" },
    { id: 3, title: "Pokemon Platinum", image: "/PP.png" },
    { id: 4, title: "Super Mario 64", image: "/SM64.jpg" },
    { id: 5, title: "Goldeneye", image: "/Goldeneye.jpg" },
    { id: 5, title: "Super Mario World", image: "/SMW.png" },
  ];

  return (
    <section className="featured-games">
      <h2>Featured Games</h2>

      <ul className="featured-games-list">
        {featuredGames.map((game) => (
          <li key={game.id} className="featured-game-card">
            <img src={game.image} alt={game.title} />
            <span className="game-title">{game.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FeaturedGames;
