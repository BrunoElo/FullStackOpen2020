import patientEntries from "../data/patients";
import { NewPatient, NoPatientSsn, Patient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientEntries;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsWithoutSsn = (): NoPatientSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (patient: NewPatient) => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient,
};
