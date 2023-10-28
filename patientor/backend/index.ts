import express = require("express");
import cors from "cors";
import diagnoseService from "./services/diagnoseService";
import patientService from "./services/patientService";
import {toNewEntry, toNewPatientEntry} from "./utils";

const router = express.Router();
const app = express();

app.use(express.json());

app.use(cors());
app.use("/api", router);

router.get("/ping", (_req, res) => {
  res.json("pong");
});

router.get("/diagnoses", (_req, res) => {
  res.json(diagnoseService.getDiagnoses());
});

router.get("/patients", (_req, res) => {
  res.json(patientService.getPatientsWithoutSsn());
});

router.get("/patients/:id", (_req, res) => {
  res.json(patientService.getPatientById(_req.params.id));
});

router.post('/patients/:id/entries', (_req, res) => {
  try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newEntry = toNewEntry(_req.body);
  res.status(201).json(patientService.addPatientEntry(_req.params.id, newEntry));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send({error: errorMessage });
  }
});

router.post("/patients", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient = toNewPatientEntry(req.body);

  res.status(201).json(patientService.addPatient(newPatient));
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
