import {Diagnosis, Entry, EntryWithoutId, Gender, HealthCheckRating, Patient} from "../../types";
import {
    Button,
    Grid,
    Icon,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {Female, Male} from "@mui/icons-material";
import EntryDetails from "./EntryDetails";
import React, {useEffect, useState} from "react";
import {createPatientEntry} from "../../services/patients";
import {useParams} from "react-router-dom";

interface Props {
    patient: Patient;
    diagnoses: Diagnosis[];
}
const PatientDetailsPage = ({patient, diagnoses}: Props) => {
    const [currentPatient, setCurrentPatient] = useState<Patient>(patient);
    const [type, setType] = useState<Entry["type"]>('HealthCheck');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [criteria, setCriteria] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const { id } = useParams();

    useEffect(() => {
        setCurrentPatient(patient)
    },[patient])
    const addPatientEntry = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let newEntry: EntryWithoutId = {
          description,
          date,
          diagnosisCodes,
          specialist,
          type,
        };
            switch (newEntry.type) {
                case "HealthCheck":
                    newEntry = {
                        ...newEntry,
                        healthCheckRating
                    }
                    break;
                case "Hospital":
                    newEntry = {
                        ...newEntry,
                        discharge: {
                            date: dischargeDate,
                            criteria
                        }
                    }
                    break;
                case "OccupationalHealthcare":
                    newEntry = {
                        ...newEntry,
                        employerName,
                        sickLeave: {
                            startDate,
                            endDate
                        }
                    }
                    break;
            }
        createPatientEntry(newEntry, id).then(response => {
            setCurrentPatient(response);
        })
            .catch((error) => {
                console.log(error)
                setError(error.response.data.error);
                setTimeout(() => {
                    setError("");
                }, 4000);
            });
    }

    const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value },
        } = event;
        console.log(value)
        setDiagnosisCodes(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
      <>
        <h2>{currentPatient?.name}</h2>{" "}
        {currentPatient?.gender === Gender.Male ? (
          <Icon component={Male} fontSize={"large"} />
        ) : (
          <Icon component={Female} fontSize={"large"} />
        )}
        <p>occupation: {currentPatient?.occupation}</p>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <form onSubmit={addPatientEntry}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={date}
            type="date"
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
            Health check
          <TextField
            label="Healthcheck rating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value) as HealthCheckRating)
            }
          />
            <Grid>
                <Grid item>
                    <Button
                        style={{
                            float: "right",
                        }}
                        type="submit"
                        variant="contained"
                        onClick={() => setType('HealthCheck')}
                    >
                        Add Healthcheck Entry
                    </Button>
                </Grid>
            </Grid>
            Discharge
            <TextField
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={dischargeDate}
                type="date"
                onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
                label="Criteria"
                fullWidth
                value={criteria}
                onChange={({ target }) => setCriteria(target.value)}
            />
            <Grid>
                <Grid item>
                    <Button
                        style={{
                            float: "right",
                        }}
                        type="submit"
                        variant="contained"
                        onClick={() => setType('Hospital')}
                    >
                        Add Hospital Entry
                    </Button>
                </Grid>
            </Grid>
            Occupational healthcare
            <TextField
                label="Employer name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
                label="Start date"
                placeholder="YYYY-MM-DD"
                fullWidth
                type="date"
                value={startDate}
                onChange={({ target }) => setStartDate(target.value)}
            />
            <TextField
                label="End date"
                placeholder="YYYY-MM-DD"
                fullWidth
                type="date"
                value={endDate}
                onChange={({ target }) => setEndDate(target.value)}
            />
            <InputLabel id="demo-multiple-name-label">Diagnosis codes</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={diagnosisCodes}
                onChange={handleChange}
                input={<OutlinedInput label="Diagnosis codes" />}
                // MenuProps={MenuProps}
            >
                { ['Z57.1', 'Z74.3', 'M51.2', 'S62.5'].map((code) => (
                    <MenuItem
                        key={code}
                        value={code}
                        // style={getStyles(name, personName, theme)}
                    >
                        {code}
                    </MenuItem>
                ))}
            </Select>

          <Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
                onClick={() => setType('OccupationalHealthcare')}
              >
                Add Occupational Healthcare Entry
              </Button>
            </Grid>
          </Grid>
        </form>
        {currentPatient?.entries.length && (
          <>
            <h3>entries</h3>
            {currentPatient?.entries.map((entry, index) => (
              <EntryDetails
                key={entry.date + index}
                entry={entry}
                diagnoses={diagnoses}
              />
            ))}
          </>
        )}
      </>
    );
}

export default PatientDetailsPage