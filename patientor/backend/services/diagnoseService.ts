import diagnoseEntries from "../data/diagnoses";
import { Diagnose } from "../types";

const diagnoses: Diagnose[] = diagnoseEntries;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
