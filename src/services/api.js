import axios from "axios";

export const baseURL = "https://live-share-2jnx.onrender.com";
// export const baseURL = "http://localhost:5000";


const api = axios.create({
  baseURL: `${baseURL}/api`,
});

export default api;
