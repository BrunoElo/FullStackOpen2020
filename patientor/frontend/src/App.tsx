import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch} from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import {Diagnosis, Patient} from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetailsPage from "./components/PatientDetailsPage";
import diagnosisService from "./services/diagnosisService";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const match = useMatch('/patients/:id')
  const patient = match ? patients.find(patient => patient.id === match.params.id) : null

  const fetchDiagnosis = async () => {
    const diagnoses = await diagnosisService.getDiagnosis();
    setDiagnoses(diagnoses)
  }

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
    void fetchDiagnosis();
  }, []);
  
  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path={`/patients/:id`} element={<PatientDetailsPage patient={patient as Patient} diagnoses={diagnoses} />}></Route>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
