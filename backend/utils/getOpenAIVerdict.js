// backend/utils/getOpenAIVerdict.js
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

export async function getOpenAIVerdict(payload) {
  // --- CHANGE THIS LINE ---
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Or "gemini-1.5-flash"

  const prompt = `Compare the following two cars and provide a verdict:

Car A: ${JSON.stringify(payload.carA, null, 2)}

Car B: ${JSON.stringify(payload.carB, null, 2)}

User Intent: ${JSON.stringify(payload.userIntent)}

Based on the specifications and user intent, decide which car is better.
Provide a clear "Winner:", "Reasons:" for your choice, and a "Rating:" out of 5 for the winning car's suitability based on the intent.

Example Format:
Winner: Car A - Brand X Year Y
Reasons: Car A is better because of its superior fuel economy and safety features for family use.
Rating: 4.5
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini Raw Response:", text); // Log raw response for debugging

    // ... (rest of your parsing logic remains the same) ...
    let winnerBrand = "";
    let winnerYear = "";
    let reasons = text;
    let rating = 0;

    const winnerMatch = text.match(/Winner:\s*(.+)/i);
    if (winnerMatch && winnerMatch[1]) {
      const winnerParts = winnerMatch[1].trim().split(" - ");
      if (winnerParts.length >= 2) {
        winnerBrand = winnerParts[0].trim();
        winnerYear = winnerParts[1].trim();
      } else {
        const yearMatch = winnerMatch[1].match(/(\d{4})$/);
        if (yearMatch) {
          winnerYear = yearMatch[1];
          winnerBrand = winnerMatch[1].replace(yearMatch[0], "").trim();
        } else {
          winnerBrand = winnerMatch[1].trim();
        }
      }
    }

    const reasonsMatch = text.match(/Reasons:\s*(.+?)(?=\nRating:|$)/is);
    if (reasonsMatch && reasonsMatch[1]) {
      reasons = reasonsMatch[1].trim();
    }

    const ratingMatch = text.match(/Rating:\s*([\d.]+)/i);
    if (ratingMatch && ratingMatch[1]) {
      rating = parseFloat(ratingMatch[1]);
    }

    let actualWinner = null;
    if (payload.carA.brand === winnerBrand && payload.carA.year == winnerYear) {
      actualWinner = payload.carA;
    } else if (
      payload.carB.brand === winnerBrand &&
      payload.carB.year == winnerYear
    ) {
      actualWinner = payload.carB;
    } else {
      actualWinner = payload.carA;
    }

    return {
      winner: actualWinner,
      reasons: reasons,
      rating: rating,
      userrating: null,
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get verdict from Gemini API.");
  }
}
