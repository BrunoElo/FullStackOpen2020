interface ExerciseCalculation {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  dailyTargetHours: number
): ExerciseCalculation => {
  const average =
    dailyExerciseHours.reduce(
      (prevValue, currentVal) => prevValue + currentVal,
      0
    ) / 7;
  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter(Boolean).length,
    success: average >= dailyTargetHours,
    rating: average > dailyTargetHours ? 3 : average === 0 ? 1 : 2,
    ratingDescription: "not too bad but could be better",
    target: dailyTargetHours,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
