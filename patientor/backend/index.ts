import express = require("express");
import cors from "cors";
import diagnoseService from "./services/diagnoseService";
import patientService from "./services/patientService";
import toNewPatientEntry from "./utils";

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

router.post("/patients", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient = toNewPatientEntry(req.body);

  res.status(201).json(patientService.addPatient(newPatient));
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
