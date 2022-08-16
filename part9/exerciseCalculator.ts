interface CalculatedExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  dailyExerciseHours: number[];
  dailyTargetHours: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const dailyTargetHours = Number(args[2]);
  const dailyExerciseHours = args.slice(3).map(Number);
  if (!isNaN(dailyTargetHours) && !dailyExerciseHours.includes(NaN)) {
    return {
      dailyTargetHours,
      dailyExerciseHours,
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

const calculateExercises = (
  dailyExerciseHours: number[],
  dailyTargetHours: number
): CalculatedExerciseValues => {
  const average =
    dailyExerciseHours.reduce(
      (prevValue, currentVal) => prevValue + currentVal,
      0
    ) / dailyExerciseHours.length;
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

try {
  const { dailyExerciseHours, dailyTargetHours } = parseExerciseArguments(
    process.argv
  );
  console.log(calculateExercises(dailyExerciseHours, dailyTargetHours));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
