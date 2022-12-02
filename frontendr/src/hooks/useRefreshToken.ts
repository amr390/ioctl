import axios from '@utils/axios'
import { API_ROUTES } from '@utils/constants'
import { AxiosResponse } from 'axios'

const setAuth = (prev: any) => {}

const useRefreshToken = () => {
  const refresh = async () => {
    const response: AxiosResponse = await axios.get(API_ROUTES.SIGN_REFRESH, {
      withCredentials: true,
    })

    setAuth((prev: any) => {
      console.log('some code that lets you set the refresh token in a cookie')
      console.log('some code that sets the jwt token in a service')
      return { ...prev, accessToken: response.data.accessToken }
    })
  }

  return refresh;
}

export default useRefreshToken
