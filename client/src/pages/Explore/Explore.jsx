import React, { useEffect } from 'react'
import './Explore.scss'
import {useDispatch, useSelector} from 'react-redux'
import { allPosts } from '../../redux/actions/postActions';
import ExPost from '../../components/ExPost/ExPost';
import {
    Avatar,
    CommentOutlined,
    Like,
    LikeOutlined,
    SaveOutlined,
    ShareOutlined,
  } from "react-ig-icons";
  import {toast} from 'react-hot-toast'

const Explore = () => {
    const {posts, message} = useSelector(state => state.post);

    const dispatch = useDispatch();

    useEffect(()=>{
        if(message){
            toast.success(message);
            dispatch({type: 'clearMsg'})
        }

    },[message])

    useEffect(()=>{
        dispatch(allPosts({user:''}));
    },[]);

  return (
    <div className="explore__page">
        <div className="posts">
            {posts?.length > 0 && posts.map(item => <ExPost key={item._id} post={item} />)}
        </div>
        {posts?.length <= 0 && <p className='error__msg'>No post yet.</p>}
    </div>
  )
}

export default Explore