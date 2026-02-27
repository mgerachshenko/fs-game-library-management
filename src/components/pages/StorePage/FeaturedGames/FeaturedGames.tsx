/**
 * Lance's I.3 Explanation Block
 * This component properly implements the hook 
 * because this is where all games are then displayed from the given props
 * including the function for toggling game ownership when clicking a button by having 
 * FeaturedGameProps interface so that FeaturedGames is aware of what type of data it is going to receive
 */

import "./FeaturedGames.css";
import React from "react";
import { useState } from "react";
import type { Game } from "../../../../types/game";

type ReviewFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type FeaturedGamesProps = {
  games: Game[];
  toggleOwnedGame: (id: number) => Promise<void>;
  reviewsByGame: { [id: number]: string[] };
  setReviewsByGame: React.Dispatch<
    React.SetStateAction<{ [id: number]: string[] }>
  >;
};

/** Form for adding the game review. */
function ReviewForm({ value, onChange, onSubmit }: ReviewFormProps) {
  const trimmed = value.trim();

  return (
    <form className="review-form" onSubmit={onSubmit}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write Here"
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
function FeaturedGames({
  games,
  toggleOwnedGame,
  reviewsByGame,
  setReviewsByGame,
}: FeaturedGamesProps) {
  const [draftReviews, setDraftReviews] = useState<{ [id: number]: string }>({});
  const [openReview, setOpenReview] = useState<{ [id: number]: boolean }>({});

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

  /** Adds a review for a specific game when the form is submitted */
  function handleAddReview(
    gameId: number,
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    const currentDraft = draftReviews[gameId];
    const trimmedText = currentDraft ? currentDraft.trim() : "";

    if (trimmedText.length === 0) {
      return;
    }

    setReviewsByGame((prev) => {
      const existingReviews = prev[gameId] || [];

      return {
        ...prev,
        [gameId]: [...existingReviews, trimmedText],
      };
    });

    setDraftReviews((prev) => {
      return { ...prev, [gameId]: "" };
    });

    setOpenReview((prev) => {
      return { ...prev, [gameId]: false };
    });
  }

  /** Removes one review from a game by index */
  function handleRemoveReview(gameId: number, index: number) {
    setReviewsByGame((prev) => ({
      ...prev,
      [gameId]: prev[gameId].filter((_, i) => i !== index),
    }));
  }

  return (
  <section className="featured-games">
    <h2>Featured Games</h2>

    <ul className="featured-games-list" tabIndex={0}>
      {games.map((game) => {
        const draft = draftReviews[game.id] || "";
        const reviews = reviewsByGame[game.id] || [];
        const isOpen = openReview[game.id];

        return (
          <li key={game.id} className="featured-game-card">
            <img src={game.image} alt={game.title} />
            <span className="game-title">{game.title}</span>

            <div className="card-actions">
              <button onClick={() => toggleOwnedGame(game.id)}>
                {game.isOwned ? "Remove" : "Add"}
              </button>

              <button
                type="button"
                className="review-button"
                onClick={() => toggleReview(game.id)}
              >
                {isOpen ? "Cancel" : "Write Review!"}
              </button>
            </div>

            {isOpen && (
              <ReviewForm
                value={draft}
                onChange={(text) => handleDraftChange(game.id, text)}
                onSubmit={(e) => handleAddReview(game.id, e)}
              />
            )}

            {reviews.length > 0 && (
              <ul className="game-reviews">
                {reviews.map((review, index) => (
                  <li key={index} className="game-review">
                    <p>{review}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveReview(game.id, index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  </section>
);
}

export default FeaturedGames;
