import { useState } from "react";
import { Stars } from "./Stars";
import type { ApiReview } from "../api/types";

interface ReviewsSliderProps {
  reviewsData?: string[];
  textReviews?: ApiReview[];
}

export function ReviewsSlider({ reviewsData = [], textReviews }: ReviewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  if (textReviews?.length) {
    const visible = textReviews.slice(currentIndex, currentIndex + itemsPerPage);
    const isPrevDisabled = currentIndex === 0;
    const isNextDisabled = currentIndex >= textReviews.length - itemsPerPage;

    return (
      <div className="reviews container" style={{ overflow: "hidden" }}>
        <div className="reviews-header">
          <h2 className="text-h1-unbounded">Отзывы наших клиентов</h2>
          <div className="slider-controls">
            <button
              type="button"
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - itemsPerPage))}
              className={`slider-btn ${isPrevDisabled ? "disabled" : "active"}`}
              disabled={isPrevDisabled}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex(
                  Math.min(textReviews.length - itemsPerPage, currentIndex + itemsPerPage),
                )
              }
              className={`slider-btn ${isNextDisabled ? "disabled" : "active"}`}
              disabled={isNextDisabled}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="slider-viewport">
          <div className="review-list">
            {visible.map((review) => (
              <div className="review-card" key={review.id} style={{ padding: 24 }}>
                <div style={{ marginBottom: 12 }}>
                  <Stars count={review.rating} />
                </div>
                <p className="text-body-lg" style={{ marginBottom: 16, lineHeight: 1.5 }}>
                  {review.text}
                </p>
                <div className="text-h3">{review.author_name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const visibleReviews = reviewsData.slice(currentIndex, currentIndex + itemsPerPage);
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= reviewsData.length - itemsPerPage;

  return (
    <div className="reviews container" style={{ overflow: "hidden" }}>
      <div className="reviews-header">
        <h2 className="text-h1-unbounded">Отзывы наших клиентов</h2>
        <div className="slider-controls">
          <button
            type="button"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - itemsPerPage))}
            className={`slider-btn ${isPrevDisabled ? "disabled" : "active"}`}
            disabled={isPrevDisabled}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() =>
              setCurrentIndex(
                Math.min(reviewsData.length - itemsPerPage, currentIndex + itemsPerPage),
              )
            }
            className={`slider-btn ${isNextDisabled ? "disabled" : "active"}`}
            disabled={isNextDisabled}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="slider-viewport">
        <div className="review-list">
          {visibleReviews.map((review, index) => (
            <div className="review-card" key={currentIndex + index}>
              <img src={review} alt="Отзыв" className="review-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Stars };
