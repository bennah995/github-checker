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

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response?.status === 404){
      throw new Error("User not found. Check the username and try again.")
    }
    if(error.response?.status === 403){
      throw new Error("GitHub API rate limit reached. Please wait and try again.")
    }
    throw error;
  }
)

export default client;