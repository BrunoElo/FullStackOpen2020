interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight,
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (16 < bmi && bmi < 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (17 < bmi && bmi < 18.4) {
    return "Underweight (Mild thinness)";
  } else if (18.5 < bmi && bmi < 24.9) {
    return "Normal (healthy weight)";
  } else if (25 < bmi && bmi < 29.9) {
    return "UnOverweight (Pre-obese)";
  } else if (30 < bmi && bmi < 34.9) {
    return "Obese (Class I)";
  } else if (35 < bmi && bmi < 39.9) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
