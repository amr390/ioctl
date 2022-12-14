import { axiosPrivate } from '@utils/axios'
import { API_ROUTES } from '@utils/constants'
import { AxiosResponse } from 'axios'
import { useAuth } from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const response: AxiosResponse = await axiosPrivate.post(
      API_ROUTES.SIGN_REFRESH
    )
    setAuth((prev) => {
      console.log(JSON.stringify(prev))
      console.log(response.data.access_token)
      return { ...prev, accessToken: response.data.access_token }
    })
    return response.data
  }

  return refresh
}

export default useRefreshToken
