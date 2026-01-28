import "./FeaturedGames.css";
import { useState } from "react";

type FeaturedGame = {
  id: number;
  title: string;
  image: string;
};

type ReviewFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function FeaturedGames() {
  const [draftReviews, setDraftReviews] = useState<{ [id: number]: string }>({});
  const [reviewsByGame, setReviewsByGame] = useState<{ [id: number]: string[]}>({});
  const [openReview, setOpenReview] = useState<{ [id: number]: boolean }>({});
  const featuredGames: FeaturedGame[] = [
    { id: 1, title: "EarthBound", image: "/EB.jpg" },
    { id: 2, title: "The Legend of Zelda", image: "/LOZOOT.jpg" },
    { id: 3, title: "Pokemon Platinum", image: "/PP.png" },
    { id: 4, title: "Super Mario 64", image: "/SM64.jpg" },
    { id: 5, title: "Goldeneye", image: "/Goldeneye.jpg" },
    { id: 6, title: "Super Mario World", image: "/SMW.png" },
  ];

  return (
    <section className="featured-games">
      <h2>Featured Games</h2>

      <ul className="featured-games-list" tabIndex={0}>
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
