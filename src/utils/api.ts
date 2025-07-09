import axios from "axios";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const MAP_URL = process.env.NEXT_PUBLIC_MAP_URL;

export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});
