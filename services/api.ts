import axios from "axios";

export const api = axios.create({
  baseURL: typeof window !== 'undefined' ? '/api' : 'http://localhost:3000/api'
});
