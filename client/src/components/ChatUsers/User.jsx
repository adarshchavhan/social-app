import React from 'react'
import {Avatar} from 'react-ig-icons'

const User = ({user, online}) => {
  return (
    <div className="user__card">
        <Avatar w='35px'  h='35px' src={user.avatar?.url}/>
        {online && <span></span>}

        <div className="text">
            <b>{user.name}</b>
            <span>{user.handle}</span>
        </div>
    </div>
  )
}

export default User