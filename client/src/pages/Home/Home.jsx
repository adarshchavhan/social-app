import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { suggestedUsers } from '../../redux/actions/userActions';
import './Home.scss'
import User from './User';
import { followingPosts, getPost } from '../../redux/actions/postActions';
import Post from './Post';
import {toast} from 'react-hot-toast'

const Home = () => {
    const {mloading, user, users} = useSelector(state => state.user);
    let {loading:postLoading, message, posts} = useSelector(state => state.post);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(followingPosts());
        dispatch(suggestedUsers());
    },[dispatch])

    useEffect(()=>{
        if(message){
            toast.success(message);
            dispatch({type: 'clearMsg'})
        }
    },[message])

  return (
    <div className="home__page">
        <div className="wrapper">
        <div className="home__left">
            <div className="posts">
                {(postLoading===false && posts?.length > 0) ? <>
                    {posts.map((post, i) => <Post key={post._id} post={post} user={user} />)}
                </> : <p className='msg'>No post yet. </p>}
            </div>
        </div>
        <div className="home__right">
            <User user={user} isAccount={true}/>

            {(mloading===false && users?.length > 0) && <>
                <h3>Suggested Users</h3>
                {users.map(item => <User key={item._id} user={item} />)}
            </>}
        </div>
        </div>
    </div>
  )
}

export default Home