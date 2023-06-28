import React, {  useEffect, useState } from 'react'
import { Avatar } from 'react-ig-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import { deleteComments,likeComment,updateComments } from '../../redux/actions/postActions';
import { Icon } from '@iconify/react';
import './Comment.scss';

const Comment = ({elm}) => {
  
  const {user} = useSelector(state => state.user);
  const {mloading, message} = useSelector(state => state.post);
  
  const [comment, setComment] = useState({editMode: false, text:elm.text, likes: 0, liked: false});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setComment({...comment, text: e.target.value});
    }

    const handleKeyDown = (e) => {
      e.target.style.height = '15px';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
    
    const handleDeleteComment = (commentId) => {
      dispatch(deleteComments(commentId))
    }


    const handleUpdateComment = () => {
        dispatch(updateComments(elm._id, {text: comment.text}));
        setComment({editMode: false, text:comment.text});
    } 

    const handleLikeComment = async() => {
      const req = await dispatch(likeComment(elm._id));
      if(req.type === 'likeCommentSuccess'){
        if(comment.liked){
          setComment({...comment, likes:comment.likes-1, liked: false});
        }else{
          setComment({...comment, likes:comment.likes+1, liked: true});
        }
      }
    }

    useEffect(()=>{
      setComment({editMode: false, text:comment.text, likes:elm?.likes.length, liked: elm?.likes.includes(user._id) ? true:false})
    },[comment.liked])
    

  return (
    <div className="comment__card" >
                        <div>
                          <Avatar src={elm?.user.avatar?.url}/>
                          <div className="text">
                            <small><Link to={`/user/${elm?.user?.handle}`}>{elm.user.handle}</Link> •  <TimeAgo datetime={elm.createdAt} locale="in" /></small>
                            {!comment.editMode && <p>{comment.text}</p>}
                            {comment.editMode && <textarea rows={1} value={comment.text} onKeyDown={handleKeyDown} onChange={handleChange}>{comment.text}</textarea>}

                            
                            <div className='btns__wrapper'>
                            <button onClick={handleLikeComment} className={comment.liked ? 'liked' : ''}>
                              <span className="icon">{comment.likes}</span>
                              <Icon icon="heroicons-solid:thumb-up"/>
                              </button>
                              <button>
                              <Icon icon="heroicons-solid:thumb-down" />
                              </button>
                            {elm.user._id===user._id && <div className="btns">
                              {!comment.editMode && <>
                                <button onClick={()=> setComment({...comment, editMode: true})}>
                                <Icon icon="ant-design:edit-filled" />
                                </button>
                                <button onClick={()=> handleDeleteComment(elm._id)} disabled={mloading ? true:false}>
                                <Icon icon="fluent:delete-12-filled" />
                                </button>
                              </>}

                              {comment.editMode && <>
                                <button onClick={()=> setComment({editMode: false, text:elm.text})}>
                                <Icon icon="mdi:clear-box" />
                                </button>
                                <button onClick={handleUpdateComment}>
                                <Icon icon="ic:round-save" />
                                </button>
                              </>}
                            </div>}
                            </div>

                          </div>
                        </div>
                       </div>
  )
}

export default Comment