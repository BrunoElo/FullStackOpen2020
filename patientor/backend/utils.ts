import {
  Diagnose,
  DischargeInfo,
  Entry,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatient,
  SickLeaveInfo
} from "./types";

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

type EntryFields = {
  date: unknown;
  description: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  employerName: unknown;
  type: unknown;
  healthCheckRating: unknown;
  sickLeave: unknown;
  discharge: unknown;
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields) => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };

  return newEntry;
};

export const toNewEntry = ({
  employerName,
  type,
  healthCheckRating,
  sickLeave,
  discharge,
  date,
  description,
  specialist,
  diagnosisCodes,
}: EntryFields) => {
  const newEntry: Partial<EntryWithoutId> = {
    type: parseType(type),
    date: parseDate(date),
    description: parseDescription(description),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes({ diagnosisCodes }),
  };

  switch (newEntry.type) {
    case "HealthCheck":
      newEntry.healthCheckRating = parseHealthCheckRating(healthCheckRating);
      break;
    case "Hospital":
      newEntry.discharge = parseDischarge(discharge);
      break;
    case "OccupationalHealthcare":
      newEntry.employerName = parseEmployerName(employerName);
      newEntry.sickLeave = parseSickLeave(sickLeave);
  }
  return newEntry as EntryWithoutId;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employer name");
  }
  return employerName;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSickLeave = (sickLeave: unknown): SickLeaveInfo => {
  if (!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  } else {
    parseDate(sickLeave.startDate);
    parseDate(sickLeave.endDate);
  }
  return sickLeave as SickLeaveInfo;
};

const parseDischarge = (discharge: unknown): DischargeInfo => {
  if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('Incorrect or missing discharge');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  } else if(!discharge.criteria || !isString(discharge.criteria)) {
    throw new Error("Incorrect or missing criteria");
  } else {
    parseDate(discharge.date);
  }
  return discharge as DischargeInfo;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is Entry["type"] => {
  const types: Entry["type"][] = ['OccupationalHealthcare',"HealthCheck","Hospital"];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return types.includes(param);
};

const parseType = (type: unknown): Entry['type'] => {
  if (!type || !isType(type)) {
    throw new Error("Incorrect or missing type: " + type);
  }
  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (isNaN(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing health check rating: " + healthCheckRating);
  }
  return healthCheckRating;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

