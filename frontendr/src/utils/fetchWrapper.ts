import { authService } from '@services/authService'

const token = authService.getToken()

interface IOptions{
  method: string;
  success: Function;
  error: Function
}

const get = (url: string, opts: {IOptions}): void => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  fetch(url, opts)
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
