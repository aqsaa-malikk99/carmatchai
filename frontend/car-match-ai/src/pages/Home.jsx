import { useNavigate } from "react-router-dom";
import React from "react";
import "../styles/HomePage.css"; // Keep this line if you have custom CSS in HomePage.css

export default function Home() {
  const navigate = useNavigate();

  const handleOption = (option) => {
    navigate("/compare", { state: { option } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      {/* Title with gamey feel, golden fill, and stroke */}
      <h1
        className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4
                     text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600
                     game-title-stroke drop-shadow-lg animate-pulse"
      >
        CarMatch AI
      </h1>

      {/* H2 complementing the title */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-purple-300">
        Make decisions faster with AI
      </h2>

      {/* Readable paragraph */}
      <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-md text-center">
        Choose an option to start comparing
      </p>

      {/* Game-like buttons */}
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-6">
        <button
          onClick={() => handleOption("with-specs")}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600
                     text-white font-bold text-lg rounded-full shadow-lg
                     hover:from-green-600 hover:to-teal-700
                     transform hover:scale-105 transition-all duration-300
                     border-2 border-green-300 ring-2 ring-green-700 ring-opacity-50
                     focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-75"
        >
          I have the specifications of my cars
        </button>
        <button
          onClick={() => handleOption("without-specs")}
          className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600
                     text-white font-bold text-lg rounded-full shadow-lg
                     hover:from-red-600 hover:to-orange-700
                     transform hover:scale-105 transition-all duration-300
                     border-2 border-red-300 ring-2 ring-red-700 ring-opacity-50
                     focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-75"
        >
          I don't have any specifications of the cars
        </button>
      </div>
    </div>
  );
}
