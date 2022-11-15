
import { authService } from '@services/authService'
import { useState } from 'react'

const {token, setToken} = useState(authService.getToken())

const __handle = () => {
   

}

const _addHeaders = () => ({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
})
  

const get = (url: string): Promise<any> => {
  let opts = Object.assign({}, _addHeaders(), { method: 'GET'})
  return fetch(url, opts)
}

const post = (url: string): void => {

}
const put = (url: string): void => { 
}
const _delete = (url: string): void => { 
}

export const fetchWrapper = {
  get,
  post,
  put,
  _delete,
}
