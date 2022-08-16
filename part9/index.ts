import express = require("express");
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!isNaN(height) && !isNaN(weight)) {
    const body: { height: number; weight: number; bmi: string } = {
      height,
      weight,
      bmi: calculateBmi(height, weight),
    };
    res.json(body);
  } else {
    res.json({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    daily_exercises,
    target,
  }: { daily_exercises: number[]; target: number } = req.body;
  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({
      error: "parameters missing",
    });
  } else if (!isNaN(target) && !daily_exercises.includes(NaN)) {
    const result = calculateExercises(daily_exercises, target);
    res.status(200).json(result);
  } else {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
