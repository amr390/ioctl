import { authService } from '@services/authService'

const token = authService.getToken()


interface IOptions{
  method: string;
  success: Function;
  error: Function;
  headers?: any;
}

const __handle = () => {
   

}

const _addHeaders = (opts : IOptions): IOptions => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }


  return Object.assign({}, opts, headers) 
}

const get = (url: string, opts: IOptions): void => {
  fetch(url, _addHeaders(opts))
}

const post = (): void => { }
const put = (): void => { }
const _delete = (): void => { }

export const fetchWrapper = {
  get,
  post,
  put,
  _delete,
}
