import { IUser } from '@models';
import React from 'react'

interface IProps {
  userList: IUser[];
}
export const UserList = (props : IProps) => {
  return (
    <section>
      <ul>
      {props.userList.map(user => 
        <li key={user.username}>{user.username} {user.is_active ? 'Active' : 'Not activated'}</li>
      )}
      </ul>
      
    </section>
  )
}
