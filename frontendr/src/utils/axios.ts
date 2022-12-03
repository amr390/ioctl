import axios from 'axios'

const config: any = {
  serverUrl: 'localhost:8000' 
}


export default axios.create({
  baseURL: config.serverUrl,
  withCredentials: true
})


