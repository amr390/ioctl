import { API_ROUTES } from '@utils/constants'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import useAxiosPrivate from './useAxiosPrivate'

export const useProfile = () => {
  const axiosPrivate = useAxiosPrivate()
  const [profile, setProfile] = useState<any>({})

  useEffect(() => {
    const controller = new AbortController()

    const getUserProfile = async () => {
      try {
        const response: AxiosResponse = await axiosPrivate.get(
          API_ROUTES.USER_ME_GET,
          {
            signal: controller.signal,
          }
        )
        console.log('user details: ', response.data)
        setProfile((prev) => {
          const data = response.data
          return { ...prev, data }
        })
      } catch (err) {
        console.error(err)
      }
    }

    getUserProfile()

    return () => {
      controller.abort() // abort any requests on going
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return profile
}