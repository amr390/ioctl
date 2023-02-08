import { IUser } from '@models'
import { API_ROUTES } from '@utils/constants'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/* Wrapper to store all methods connecting to user resource api */

const getMe = async (axios: AxiosInstance, opts: AxiosRequestConfig): Promise<AxiosResponse> => {
  return axios.get(API_ROUTES.USER_ME_GET, opts)
}

const list = async (axios: AxiosInstance, opts: AxiosRequestConfig): Promise<AxiosResponse> => {
  return axios.get(API_ROUTES.USER_CRUD, opts)
}
const save = async (axios: AxiosInstance, user: IUser) => {
  return axios.post(API_ROUTES.USER_CRUD, user, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

const update = async (axios: AxiosInstance, user: IUser) => {
  return axios.put(`${API_ROUTES.USER_CRUD}/${user.id}`, user, {
    headers: {
      'content-type': 'application/json',
    },
  })
}
const remove = async (axios: AxiosInstance, user: IUser) => {
  return axios.delete(`${API_ROUTES.USER_CRUD}/${user.id}`)
}

const UserApi = {
  getMe,
  list,
  save,
  update,
  remove,
}

export default UserApi
