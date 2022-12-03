import axios from '@utils/axios'
import { API_ROUTES } from '@utils/constants'
import { AxiosResponse } from 'axios'

const useRefreshToken = () => {
  const refresh = async () => {
    const response: AxiosResponse = await axios.get(API_ROUTES.SIGN_REFRESH, {
      withCredentials: true,
    })

    console.log(JSON.stringify(response.data.accessToken))
    return response.data.accessToken
  }

  return refresh;
}

export default useRefreshToken
