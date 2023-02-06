import { IUser } from '@models'
import { API_ROUTES } from '@utils/constants'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import useAxiosPrivate from './useAxiosPrivate'

const emptyProfile: any = {
  id: -1,
  full_name: '',
  email: '',
  phone: '',
  password: '',
  repassword: '',
}

export const useProfile = () => {
  const axiosPrivate = useAxiosPrivate()
  const [profile, setProfile] = useState<IUser>(emptyProfile)

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
        setProfile((prev: any) => {
          return { ...prev, ...response.data }
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
