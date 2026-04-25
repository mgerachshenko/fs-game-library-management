import "./FeaturedGames.css";
import React, { useState } from "react";
import type { Game } from "@shared/types/game";
import { generalInputService } from "../../../../services/inputService";
import { createReview, deleteReview } from "../../../../services/reviewService";
import { SignedIn } from "@clerk/clerk-react";

type Review = {
    id: number;
    content: string;
};

type ReviewFormProps = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type FeaturedGamesProps = {
    games: Game[];
    toggleOwnedGame: (id: number) => Promise<void>;
    reviewsByGame: { [id: number]: Review[] };
    setReviewsByGame: React.Dispatch<
        React.SetStateAction<{ [id: number]: Review[] }>
    >;
};

/** Review Form Component */
function ReviewForm({ value, onChange, onSubmit }: ReviewFormProps) {
    const validation = generalInputService(value);

    const showError = value.trim().length > 0 && !validation.isValid;

    return (
        <form className="review-form" onSubmit={onSubmit}>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Write Here"
            />

            {showError && (
                <p className="review-error">{validation.errors[0]}</p>
            )}

            <div className="review-form-footer">
                <button type="submit" disabled={!validation.isValid}>
                    Add review!
                </button>
            </div>
        </form>
    );
}

/** Displays featured games */
function FeaturedGames({
    games,
    toggleOwnedGame,
    reviewsByGame,
    setReviewsByGame,
}: FeaturedGamesProps) {
    const [draftReviews, setDraftReviews] = useState<{ [id: number]: string }>({});
    const [openReview, setOpenReview] = useState<{ [id: number]: boolean }>({});

    function toggleReview(gameId: number) {
        setOpenReview((prev) => ({
            ...prev,
            [gameId]: !prev[gameId],
        }));
    }

    function handleDraftChange(gameId: number, text: string) {
        setDraftReviews((prev) => ({
            ...prev,
            [gameId]: text,
        }));
    }

    async function handleAddReview(
        gameId: number,
        e: React.FormEvent<HTMLFormElement>,
    ) {
        e.preventDefault();

        const currentDraft = draftReviews[gameId] || "";
        const validation = generalInputService(currentDraft);

        if (!validation.isValid) return;

        const trimmedText = currentDraft.trim();

        try {
            const newReview = await createReview(gameId, trimmedText);

            setReviewsByGame((prev) => {
                const existing = prev[gameId] || [];
                return {
                    ...prev,
                    [gameId]: [...existing, newReview],
                };
            });

            setDraftReviews((prev) => ({
                ...prev,
                [gameId]: "",
            }));

            setOpenReview((prev) => ({
                ...prev,
                [gameId]: false,
            }));
        } catch (error) {
            console.error(error);
        }
    }

    async function handleRemoveReview(gameId: number, reviewId: number) {
        try {
            await deleteReview(reviewId);

            setReviewsByGame((prev) => ({
                ...prev,
                [gameId]: prev[gameId].filter((r) => r.id !== reviewId),
            }));
        } catch (error) {
            console.error(error);
        }
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

                            <SignedIn>
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
                            </SignedIn>

                            {isOpen && (
                                <ReviewForm
                                    value={draft}
                                    onChange={(text) =>
                                        handleDraftChange(game.id, text)
                                    }
                                    onSubmit={(e) =>
                                        handleAddReview(game.id, e)
                                    }
                                />
                            )}

                            {reviews.length > 0 && (
                                <ul className="game-reviews">
                                    {reviews.map((review) => (
                                        <li key={review.id} className="game-review">
                                            <p>{review.content}</p>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveReview(
                                                        game.id,
                                                        review.id
                                                    )
                                                }
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