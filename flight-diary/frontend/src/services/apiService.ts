import axios from "axios";
import {DiaryEntry, NewDiaryEntry} from "../types";

export const apiBaseUrl = "http://localhost:3000/api";

export const getDiaries = () => {
  return axios
    .get<DiaryEntry[]>(`${apiBaseUrl}/diaries`)
    .then((response) => response.data);
};

export const addDiary = (newDiary: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(`${apiBaseUrl}/diaries`, newDiary)
};
