import React, { useEffect, useState } from 'react'
import { Avatar } from 'react-ig-icons'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { followUser, loadUser } from '../../redux/actions/userActions';

const User = ({user}) => {
    const [followed, setFollowed] = useState(false);

    const {user: loggedUser, message} = useSelector(state => state.user);
    const dispatch = useDispatch();


    const handleFollowUser = async () => {
      const req = await dispatch(followUser(user.handle));
      if(req.type === 'followUserSuccess'){
        if(!followed){
            setFollowed(true);
        }else{
            setFollowed(false);
        }
      }
    }

    useEffect(()=>{
        if(user.followers.includes(loggedUser._id)){
            setFollowed(true);
        }else{
            setFollowed(false);
        }
    },[])

  return (
    <div className="user__card">
                        <div>
                          <Avatar src={user.avatar?.url} />
                          <div className="text">
                            <h4 className="name">{user.name}</h4>
                            <Link to={`/user/${user.handle}`}>
                            <small>@{user.handle}</small>
                            </Link>
                          </div>
                        </div>
                        <div> {user._id === loggedUser._id ? <button style={{background: 'gray'}}>Follow</button> : <button onClick={handleFollowUser}>{followed ? 'Unfollow' : 'Follow'}</button>}</div>
                      </div>
  )
}

export default User