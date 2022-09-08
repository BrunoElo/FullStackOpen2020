import patientEntries from "../data/patients";
import { NoPatientSsn, Patient } from "../types";

const patients: Patient[] = patientEntries;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsWithoutSsn = (): NoPatientSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  getPatientsWithoutSsn,
};
