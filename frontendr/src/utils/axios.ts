import axios from 'axios'

const config: any = {
  serverUrl: 'localhost:8000',
}

export default axios.create({
  baseURL: config.serverUrl,
})

export const axiosPrivate = axios.create({
  baseURL: config.serverUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
