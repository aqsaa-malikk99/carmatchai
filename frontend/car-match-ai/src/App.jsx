import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComparePage from "./pages/ComparePage";
import React from "react";
import VerdictDisplay from "./components/VerdictDisplay";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/results" element={<VerdictDisplay />} />
    </Routes>
  );
}
