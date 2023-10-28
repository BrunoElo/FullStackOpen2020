import {Diagnosis, Entry, HealthCheckEntry, OccupationalHealthcareEntry} from "../../types";
import React from "react";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{entry: Entry, diagnoses: Diagnosis[]}> = ({entry, diagnoses}) => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital entry={entry} diagnoses={diagnoses} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthCare entry={entry} diagnoses={diagnoses} />;
      case "HealthCheck":
          return <HealthCheck entry={entry} diagnoses={diagnoses} />;
      default:
        return assertNever(entry);
    }
}

export default EntryDetails

const OccupationalHealthCare: React.FC<{entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[]}> = ({ entry, diagnoses }) => {
    const {date, description, diagnosisCodes, specialist, employerName} = entry;
  return (
    <p>

      {date} <MedicalServicesIcon fontSize={"small"} /> {employerName} {description}
      {diagnosisCodes?.map((code) => (
        <li key={code}>
          {code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
        </li>
      ))}
        diagnose by {specialist}
    </p>
  );
};

const Hospital = ({ entry, diagnoses }: {entry: Entry, diagnoses: Diagnosis[]}) => {
    const {date, description, diagnosisCodes, specialist} = entry;
    return (
        <p>
            {date} {description}
            {diagnosisCodes?.map((code) => (
                <li key={code}>
                    {code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
                </li>
            ))}
            diagnose by {specialist}
        </p>
    );
};

const HealthCheck: React.FC<{entry: HealthCheckEntry, diagnoses: Diagnosis[]}> = ({ entry, diagnoses }) => {
    const {date, description, diagnosisCodes, specialist, healthCheckRating} = entry;
    return (
        <p>
            {date} <WorkIcon fontSize={"small"} /> {description}
            {diagnosisCodes?.map((code) => (
                <li key={code}>
                    {code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
                </li>
            ))}
            <FavoriteIcon color={!healthCheckRating ? 'success': healthCheckRating === 3 ? 'error' : 'warning'}/>
            diagnose by {specialist}
        </p>
    );
};