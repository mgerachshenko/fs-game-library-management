import "./FeaturedGames.css";
import React from "react";
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

/** Form for adding the game review. */
function ReviewForm({ value, onChange, onSubmit }: ReviewFormProps) {
  const trimmed = value.trim();

  return (
    <form className="review-form" onSubmit={onSubmit}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write Your Review Here!"
      />
      <div className="review-form-footer">
        <button type="submit" disabled={trimmed.length === 0}>
          Add review!
        </button>
      </div>
    </form>
  );
}

/** Displays featured games at the front top of the page 
 *  and allows users to add and remove reviews */
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
    { id: 7, title: "Pokemon Emerald", image: "/PE.png" },
  ];

  /** Toggle for review box */
  function toggleReview(gameId: number) {
    setOpenReview((prev) => {
      const isOpen = prev[gameId];

      if (isOpen) {
        return { ...prev, [gameId]: false };
      }

      return { ...prev, [gameId]: true };
    });
  }

  /** Updates current review for a specific game as the user types */
  function handleDraftChange(gameId: number, text: string) {
    setDraftReviews((prev) => {
      return {
        ...prev,
        [gameId]: text,
      };
    });
  }

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