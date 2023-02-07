import { AxiosInstance } from "axios"

/* Wrapper to store all methods connecting to user resource api */

const getMe = async (axios: AxiosInstance)=> {} 
const list = async (axios: AxiosInstance)=> {} 
const save = async (axios: AxiosInstance)=> {}
const update = async (axios: AxiosInstance)=> {} 
const remove = async (axios: AxiosInstance)=> {} 


const UserApi = {
  getMe,
  list,
  save,
  update,
  remove,
}

export default UserApi;
