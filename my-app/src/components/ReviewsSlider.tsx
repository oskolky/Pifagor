import { useState } from "react";
import { Stars } from "./Stars";

interface ReviewsSliderProps {
  reviewsData: string[];
}

export function ReviewsSlider({ reviewsData }: ReviewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - itemsPerPage));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(reviewsData.length - itemsPerPage, currentIndex + itemsPerPage));
  };

  // Вычисляем, какие элементы показать
  const visibleReviews = reviewsData.slice(currentIndex, currentIndex + itemsPerPage);

  // Правильные условия блокировки кнопок
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= reviewsData.length - itemsPerPage;

  return (
    <div className="reviews container" style={{ overflow: "hidden" }}>
      <div className="reviews-header">
        <h2 className="text-h1-unbounded">Отзывы наших клиентов</h2>
        <div className="slider-controls">
          <button
            type="button"
            onClick={handlePrev}
            className={`slider-btn ${isPrevDisabled ? "disabled" : ""}`}
            disabled={isPrevDisabled}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={`slider-btn active ${isNextDisabled ? "disabled" : ""}`}
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