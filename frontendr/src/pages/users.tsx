import { useEffect, useState } from 'react'
import { API_ROUTES } from '@utils/constants'
import { AxiosResponse } from 'axios'
import useAxiosPrivate from '@hooks/useAxiosPrivate'
import { IUser } from '@models'
import UserApi from '@services/users'

export default function Users() {
  const [users, setUsers] = useState([] as IUser[])
  const axiosPrivate = useAxiosPrivate()
  const userApi = UserApi;

  useEffect(() => {
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response: AxiosResponse = await userApi.list(axiosPrivate, {signal: controller.signal})
        /* const response: AxiosResponse = await axiosPrivate.get(API_ROUTES.USER_CRUD, { */
        /*   signal: controller.signal, */
        /* }) */

        setUsers(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    getUsers()

    return () => {
      controller.abort() // abort any requests on going
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <h2>User list</h2>
      <article>
        {users?.length &&
          users.map((user, idx) => <div key={idx}> {user.email} {user.is_active? 'Active' : 'Not active'}</div>)}
      </article>
    </>
  )
}
