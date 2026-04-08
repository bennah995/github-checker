import axios from "axios"

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.github.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("Auth_token");
  if(token){
    config.headers.Authorization = `Bearer ${token} `
  }
  return config;
})

export default client;