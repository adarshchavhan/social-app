import React, { useEffect } from 'react'
import './FollowingsModel.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../../redux/actions/postActions';
import { Link } from 'react-router-dom';
import { Avatar } from 'react-ig-icons';
import { getUser } from '../../redux/actions/userActions';

const FollowersModel = ({showFollowers, handleShowFollowers, handle}) => {
    const {mloading, profile:pro} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(showFollowers){
            dispatch(getUser(handle));
        }
    },[handle]);

  return mloading===false && (
    <div className="followings__model">
        <div className="backdrop" onClick={handleShowFollowers}></div>
        <div className="model">
            <h2>Followers</h2>
            {pro && <div className="list__wrapper">
                <div>
                    {pro?.followers.length > 0 ? <>
                        {pro.followers.map(user => (
                        <div className="user__card" key={user._id}>
             
                        <Link to={`/user/${user.handle}`} onClick={handleShowFollowers}>
                          <Avatar src={user.avatar?.url} />
                          <div className="text">
                            <h4 className="name">{user.name}</h4>
                            <small>@{user.name}</small>
                          </div>
                        </Link>
                      </div>
                    ))}
                    </> : <p className='msg'>No likes yet.</p>}
                </div>
            </div>}
        </div>
    </div>
  )
}

export default FollowersModel