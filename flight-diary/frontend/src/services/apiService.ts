import axios from "axios";
import { DiaryEntry } from "../../../backend/src/types";

export const apiBaseUrl = "http://localhost:3000/api";

export const getDiaries = () => {
  return axios
    .get<DiaryEntry[]>(`${apiBaseUrl}/diaries`)
    .then((response) => response.data);
};