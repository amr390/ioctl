import SettingsContext from '@context/SettingsProvider'
import { IUser } from '@models'
import { API_ROUTES } from '@utils/constants'
import { AxiosResponse } from 'axios'
import { useContext, useEffect } from 'react'
import useAxiosPrivate from './useAxiosPrivate'

export const useProfile = () => {
  const axiosPrivate = useAxiosPrivate()
  const { profile, setProfile } = useContext(SettingsContext)

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
        setProfile((prev: IUser): IUser => {
          return { ...prev, ...response.data as IUser }
        })
      } catch (err) {
        console.error(err)
      }
    }

    (async ()=> await getUserProfile())();

    return () => {
      controller.abort() // abort any requests on going
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { profile, setProfile }
}
