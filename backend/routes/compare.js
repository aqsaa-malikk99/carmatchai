import express from "express";
import CarSpec from "../models/CarSpec.js";
import { getOpenAIVerdict } from "../utils/getOpenAIVerdict.js";
const router = express.Router();
router.get("/", async (req, res) => {
  return res.json({ message: "Bye Bye" });
});
router.post("/", async (req, res) => {
  const { carA, carB, userIntent, mode } = req.body;

  try {
    let payload = { carA, carB, userIntent };

    // If "without-specs", look up in DB
    if (mode === "without-specs") {
      const a = await CarSpec.findOne({
        brand: carA.model?.split(" ")[0],
        year: carA.model?.split(" ")[1],
      });
      const b = await CarSpec.findOne({
        brand: carB.model?.split(" ")[0],
        year: carB.model?.split(" ")[1],
      });

      if (a && b) {
        payload.carA = a.fullSpec;
        payload.carB = b.fullSpec;
      } else {
        return res
          .status(404)
          .json({ message: "Car specs not found. Please enter manually." });
      }
    }

    // Save if full specs provided
    if (mode === "with-specs") {
      await CarSpec.create({
        brand: carA.brand,
        year: carA.year,
        fullSpec: carA,
      });
      await CarSpec.create({
        brand: carB.brand,
        year: carB.year,
        fullSpec: carB,
      });
    }

    const verdict = await getOpenAIVerdict(payload);
    const newVerdict = await CarSpec.create({
      brand: verdict.winner.brand,
      year: verdict.winner.year,
      verdict,
    });

    return res.json({ verdict });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/feedback", async (req, res) => {
  const { brand, year, agree } = req.body;

  const car = await CarSpec.findOne({ brand, year });
  if (!car) return res.status(404).json({ error: "Car not found" });

  car.feedback.total += 1;
  if (agree) car.feedback.positive += 1;

  await car.save();

  return res.json({ success: true });
});

export default router;
