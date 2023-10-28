import axios from "axios";
import {EntryWithoutId, Patient, PatientFormValues} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export const createPatientEntry = async (payload: EntryWithoutId, id: any) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${id}/entries`,
    payload
  );
  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create
};

