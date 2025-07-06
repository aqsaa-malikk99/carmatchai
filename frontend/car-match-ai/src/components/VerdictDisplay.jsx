import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/VerdictDisplay.css"; // Import the custom CSS for VerdictDisplay

export default function VerdictDisplay() {
  // <-- Add onUserFeedback to props
  const location = useLocation();
  const verdict = location.state?.simulatedVerdict || null;
  const handleFeedback = async (agree) => {
    await fetch("http://localhost:5000/api/compare/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand: verdict.winner.brand,
        year: verdict.winner.year,
        agree,
      }),
    });
  };
  // Handle case where verdict data might be missing (e.g., direct navigation)
  if (!verdict) {
    return (
      <div className="verdict-container-error flex">
        <p className="text-xl text-red-500 font-bold mb-4">
          No verdict data available.
        </p>
        <p className="text-gray-400">Please go back and compare cars.</p>
      </div>
    );
  }

  const {
    winner,
    reasons,
    rating, // out of 5
    userrating,
  } = verdict;

  return (
    <div className="verdict-container">
      <p className="verdict-intro-text">We believe your first car</p>

      <h1 className="verdict-winner-title">
        {winner?.brand} - {winner?.year}
      </h1>

      <h2 className="verdict-section-heading">Reason:</h2>
      <p className="verdict-reason-text">{reasons}</p>

      <h2 className="verdict-section-heading">Rating:</h2>
      <div className="verdict-rating-stars-container">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "star-filled" : "star-empty"}>
            ★
          </span>
        ))}
      </div>
      <h2 className="verdict-section-heading">
        Accuracy Based on Past Searches:
      </h2>
      <div className="verdict-rating-stars-container">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < userrating ? "star-filled" : "star-empty"}
          >
            ★
          </span>
        ))}
      </div>
      <div className="verdict-feedback-buttons-container">
        <button
          onClick={() => handleFeedback(true)}
          className="feedback-button feedback-agree"
        >
          ✅ Yes, I agree
        </button>
        <button
          onClick={() => handleFeedback(false)}
          className="feedback-button feedback-disagree"
        >
          ❌ No, I disagree
        </button>
      </div>
    </div>
  );
}
