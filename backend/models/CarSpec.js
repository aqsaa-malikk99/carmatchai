import mongoose from "mongoose";

const CarSpecSchema = new mongoose.Schema({
  brand: String,
  year: String,
  fullSpec: Object,
  verdict: Object,
  feedback: {
    total: { type: Number, default: 0 },
    positive: { type: Number, default: 0 },
  },
});

export default mongoose.model("CarSpec", CarSpecSchema);
