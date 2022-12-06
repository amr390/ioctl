import AuthContext from '@context/AuthProvider'
import { axiosPrivate } from '@utils/axios'
import { API_ROUTES } from '@utils/constants'
import { AxiosResponse } from 'axios'
import { useContext } from 'react'

const useRefreshToken = () => {
  const { auth, setAuth } = useContext(AuthContext)

  const refresh = async () => {
    const response: AxiosResponse = await axiosPrivate.post(
      API_ROUTES.SIGN_REFRESH
    )
    setAuth(response.data)
    return response.data['access_token']
  }

  return refresh
}

export default useRefreshToken
