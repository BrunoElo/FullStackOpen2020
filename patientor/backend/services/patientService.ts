import {EntryWithoutId, NewPatient, NoPatientSsn, Patient} from "../types";
import { v1 as uuid } from "uuid";
import PatientsFull from "../data/patients-full";

const patients: Patient[] = PatientsFull;

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
    entries: [],
    ...patient
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

const getPatientById = (id: string) => {
  return patients.find(patient => patient.id === id);
};

const addPatientEntry = (id: string, entry: EntryWithoutId) => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  const patient = getPatientById(id);
  if (patient) {
    patient.entries = [...patient.entries, newEntry];
    return patient;
  }
  throw new Error("Patient not found");
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient,
  getPatientById,
  addPatientEntry
};
