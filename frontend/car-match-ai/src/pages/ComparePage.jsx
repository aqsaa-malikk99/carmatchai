import { useLocation } from "react-router-dom";
import SpecForm from "../components/SpecForm";
import React from "react";

export default function ComparePage() {
  const location = useLocation();
  const option = location.state?.option || "with-specs";
  return (
    <div className="min-h-screen  p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <SpecForm mode={option} />
    </div>
  );
}
