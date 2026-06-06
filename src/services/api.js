import axios from "axios";

const api = axios.create({
  baseURL:"https://live-share-2jnx.onrender.com/api",
});

export default api;
