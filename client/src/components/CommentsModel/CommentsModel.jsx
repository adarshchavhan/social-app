import React, { useEffect, useState } from 'react'
import Comment from '../Comment/Comment';
import { useDispatch, useSelector } from 'react-redux'
import { deleteComments, getPost, getPostComments } from '../../redux/actions/postActions';
import { Link } from 'react-router-dom';
import { Avatar } from 'react-ig-icons';
import TimeAgo from 'timeago-react';
import { toast } from 'react-hot-toast';
import './CommentsModel.scss'

const CommentsModel = ({showComments, handleShowComments, postId}) => {
    const {mloading, comments, message} = useSelector(state => state.post);
    const dispatch = useDispatch();
    
    
    useEffect(()=>{
        if(showComments){
            dispatch(getPostComments(postId));
            // if(message){
            //     toast.success(message)
            //     dispatch({type:'clearMsg'})
            // }
        }
    },[postId, message]);


  return (
    <div className="comments__model">
        <div className="backdrop" onClick={handleShowComments}></div>
        <div className="model">
            <h2>Comments</h2>
            {comments && <div className="list__wrapper">
            {comments.length>0 && <p>Total {comments.length} comments</p>}
                <div>
                    {comments?.length > 0 ? <>
                        {comments?.map(elm => <Comment key={elm._id} elm={elm}/>)}
                    </> : <p className='msg'>No comment yet.</p>}
                </div>
            </div>}
        </div>
    </div>
  )
}

export default CommentsModel