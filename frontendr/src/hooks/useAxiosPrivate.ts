import { axiosPrivate } from '@utils/axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from './useAuth'
import useRefreshToken from './useRefreshToken'

/*
  Using 
*/
const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()
  const router = useRouter()
 

  /* https://github.com/gitdagray/react_jwt_auth/ */
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.headers && !config?.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.access_token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAuth = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAuth.access_token}`
          return axiosPrivate(prevRequest)
        }
        if (error?.response?.status === 400) {
          router.replace('/login')
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxiosPrivate
