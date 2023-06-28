import React, { useEffect, useState } from 'react'
import './Profile.scss'
import {Link, useLocation, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { followUser, getUser, logoutUser } from '../../redux/actions/userActions'
import ExPost from '../../components/ExPost/ExPost'
import { Avatar, Posts, SaveOutlined } from 'react-ig-icons'
import { toast } from 'react-hot-toast'
import { allPosts } from '../../redux/actions/postActions'
import FollowingsModel from '../../components/FollowingsModel/FollowingsModel'
import FollowersModel from '../../components/FollowingsModel/FollowersModel'

const Profile = ({isAccount=false}) => {
  
  const {mloading, message:userMessage, profile:pro,user} = useSelector(state => state.user);
  const {message:postMessage, posts} = useSelector(state => state.post);

  const [following, setFollowing] = useState({count:0, followed: false});

  const [showPosts, setShowPosts] = useState(true);
  const [showFollowings, setShowFollowings] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

  const path = useLocation().pathname;
  const param = useParams();

  const dispatch = useDispatch();

  const handleShowFollowings = () => {
    setShowFollowings(!showFollowings);
  }

  const handleFollowUser = async (handle) => {
    const req = await dispatch(followUser(handle))
    if(req.type === 'followUserSuccess'){
      if(following.followed){
        setFollowing({count: following.count-1, followed:false});
      }else{
        setFollowing({count: following.count+1, followed:true});
      }
    }
  }
  
  
  const handleShowFollowers = () => {
    setShowFollowers(!showFollowers);
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  useEffect(()=>{
    if(isAccount){
      dispatch(getUser(user?.handle))
      dispatch(allPosts({user: user?.handle, saved:showPosts?false:true}));
      setFollowing({count: user?.followings.length, followed:false});

    }else{
      dispatch(getUser(param.handle))
      dispatch(allPosts({user: param.handle, saved:showPosts?false:true}));
      setFollowing({count: pro?.followings.length, followed:false});

    }
    
  },[path, param.handle, pro?._id, showPosts])

  useEffect(()=>{
    if(postMessage){
      toast.success(postMessage);
      dispatch({type:'clearMsg'});
      if(isAccount){
        dispatch(allPosts({user: user.handle, saved:showPosts?false:true}));
      }else{
        dispatch(allPosts({user: param.handle, saved:showPosts?false:true}));
      }
    }
  },[postMessage, dispatch, showPosts])


  return (
    <div className="profile__page">
      <div className="wrapper">

        {pro && <div className="profile">
          <Avatar w={150} h={150} src={pro.avatar.url}/>
          <div>
            <div className='top'>
                <div>
                  <h1>{pro.name}</h1>
                  <h3>@{pro.handle}</h3>
                </div>
                <div>
                  {!isAccount ? <button onClick={()=> handleFollowUser(pro.handle)} disabled={pro._id === user._id ? true : false} style={{background: pro._id === user._id && 'gray'}}>{following.followed ? 'Unfollow' : 'Follow'}</button> : <button onClick={handleLogout} style={{background: 'gray'}}>Logout</button>}
                  {isAccount && <Link to='/edit/account'>edit</Link>}
                </div>
              </div>
            <div className="middle">
              <button onClick={handleShowFollowers}>
                {pro.followers.length} <span>Followers</span>
              </button>
              <button onClick={handleShowFollowings}>
                {following.count} <span>Followings</span>
              </button>

              <button>
                {pro.posts.length} <span>Posts</span>
              </button>

            </div>
            <div className="bottom">
              <p>{pro?.bio}</p>
              {/* <p>Hello friends my name is Adarsh I lived in nagpur. And I'm big fan arjit singh and honey singh and I also litsen classic song of lata mageshkar, rushi kapoor and bigB (amitabh bachchan).</p> */}
            </div>
          </div>
        </div>}
        
        <div className="nav">
        <button className={showPosts ? 'active' : ''} onClick={()=> setShowPosts(true)}>
            <Posts w='16' h='16'/>
            <span>Posts</span>
          </button>
          <button className={!showPosts ? 'active' : ''} onClick={()=> setShowPosts(false)}>
            <SaveOutlined w='16px' h='16px'/>
            <span>Saved</span>
          </button>
        </div>
        {posts && <div className="body">
          {showPosts && <div className="posts">
                {posts.length > 0 && posts.map(post => <ExPost key={post._id} post={post} isAccount={isAccount}/>)}
                {posts.length <= 0 && <p className='error__msg'>No post to show.</p>}
          </div>}
          {!showPosts && <div className="posts">
                {posts.length > 0 && posts.map(post => <ExPost key={post._id} post={post} isAccount={false}/>)}
                {posts.length <= 0 && <p className='error__msg'>No saved to show.</p>}
          </div>}
        </div>}
      </div>

      {showFollowings && <FollowingsModel {...{showFollowings, handleShowFollowings, handle:isAccount?user.handle:pro.handle}}/>}
      {showFollowers && <FollowersModel {...{showFollowers, handleShowFollowers, handle:isAccount?user.handle:pro.handle}}/>}
    </div>
  )
}

export default Profile