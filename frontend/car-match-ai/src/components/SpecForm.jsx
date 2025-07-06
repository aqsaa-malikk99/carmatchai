import { useState } from "react";
import React from "react";
import CarSpecsForm from "./CarSpecsForm";
import "../styles/SpecForm.css"; // Import the custom CSS file for SpecForm
import VerdictDisplay from "./VerdictDisplay";
import { useNavigate } from "react-router-dom";

export default function SpecForm({ mode }) {
  const [carA, setCarA] = useState({});
  const [carB, setCarB] = useState({});
  const [intent, setIntent] = useState([]);
  const [customIntent, setCustomIntent] = useState("");
  const navigate = useNavigate();

  const intentsList = ["Luxury", "Family use", "Long drive", "City drive"];

  const handleIntentChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setIntent([...intent, value]);
    } else {
      setIntent(intent.filter((i) => i !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      carA,
      carB,
      userIntent: [...intent, customIntent].filter(Boolean),
      mode,
    };
    console.log("Submitting form:", payload);
    // const simulatedVerdict = {
    //   winner: {
    //     brand: "Honda",
    //     year: "2006",
    //   }, // pretend carA wins
    //   reasons:
    //     "It has better fuel economy, more airbags, and a stronger engine.",
    //   rating: 4,
    //   userrating: 2,
    // };
    // // TODO: send to backend
    // navigate("/results", { state: { simulatedVerdict } });
    const response = await fetch("http://localhost:5001/api/compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    navigate("/results", { state: { simulatedVerdict: result.verdict } });
  };

  return (
    <form onSubmit={handleSubmit} className="spec-form-container">
      {mode === "with-specs" ? (
        <>
          <h3 className="form-heading">Compare Cars - With Specs</h3>
          <CarSpecsForm car={carA} setCar={setCarA} label="Car A" />
          <CarSpecsForm car={carB} setCar={setCarB} label="Car B" />
        </>
      ) : (
        <>
          <h3 className="form-heading">Compare Cars - Without Specs</h3>
          <div className="car-model-input-group">
            <label className="car-model-label">
              Car A Model with Year:
              <input
                type="text"
                name="model"
                value={carA.model || ""}
                onChange={(e) => setCarA({ ...carA, model: e.target.value })}
                className="car-model-input"
              />
            </label>
          </div>
          <div className="car-model-input-group">
            <label className="car-model-label">
              Car B Model with Year:
              <input
                type="text"
                name="model"
                value={carB.model || ""}
                onChange={(e) => setCarB({ ...carB, model: e.target.value })}
                className="car-model-input"
              />
            </label>
          </div>
        </>
      )}

      <h3 className="form-subheading">What are you looking for in a car?</h3>
      {intentsList.map((item) => (
        <label key={item} className="intent-checkbox-label">
          <input
            type="checkbox"
            value={item}
            onChange={handleIntentChange}
            className="intent-checkbox"
          />
          {item}
        </label>
      ))}

      <input
        type="text"
        placeholder="Other preferences (optional)"
        value={customIntent}
        onChange={(e) => setCustomIntent(e.target.value)}
        className="other-preferences-input"
      />

      <button type="submit" className="submit-button">
        {mode === "with-specs" ? "Compare Cars" : "Search and Compare"}
      </button>
    </form>
  );
}
