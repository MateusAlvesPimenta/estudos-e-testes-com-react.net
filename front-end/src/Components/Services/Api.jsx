import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5235",
    timeout: 10000
});