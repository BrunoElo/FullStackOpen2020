import express = require("express");
import cors from "cors";
import diagnoseService from "./services/diagnoseService";
import patientService from "./services/patientService";

const app = express();
app.use(cors());
const router = express.Router();

app.use("/api", router);
app.use(express.json());

router.get("/ping", (_req, res) => {
  res.json("hey");
});

router.get("/diagnoses", (_req, res) => {
  res.json(diagnoseService.getDiagnoses());
});

router.get("/patients", (_req, res) => {
  res.json(patientService.getPatientsWithoutSsn());
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
