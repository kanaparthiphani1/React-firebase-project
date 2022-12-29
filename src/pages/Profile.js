import React from 'react'
import { useSession } from '../Context/UserContext'

const Profile = () => {

 const {user} = useSession();
  return (
    <div>
        <h1>name:{user.displayName}</h1>
        <p>email:{user.email}</p>
    </div>
  )
}

export default Profile