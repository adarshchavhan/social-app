import React, { useEffect, useState } from 'react'
import './ExPost.scss';
import { CommentOutlined, Like, LikeOutlined, Notifications } from 'react-ig-icons';
import { Icon } from '@iconify/react';
import PostModel from '../PostModel/PostModel';
import { useDispatch, useSelector } from 'react-redux';
import LikesModel from '../LikesModel/LikesModel';
import CommentsModel from '../CommentsModel/CommentsModel';
import { deletePost } from '../../redux/actions/postActions';
import UpdatePost from '../UpdatePost/UpdatePost';

const ExPost = ({post, isAccount=false}) => {
    const [showLikes, setShowLikes] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showPost, setShowPost] = useState(false);
    const [showUpdatePost, setShowUpdatePost] = useState(false);

    const dispatch = useDispatch();

    const handleShowLikes = () => {
        setShowLikes(!showLikes)
      }
    
      const handleShowComments = () => {
        setShowComments(!showComments)
      }
    
      const handleShowPost = () => {
        setShowPost(!showPost)
      }
    
      const handleDeletePost = () => {
        dispatch(deletePost(post._id));
      }

      const handleShowUpdatePost = () => {
        setShowUpdatePost(!showUpdatePost);
      }

  return (
    <>
    <div className="ex__post">
        <img src={post?.image.url} alt="" />
        <div className="box">
            <button onClick={handleShowLikes}>{post.likes.length}
                {<LikeOutlined w='16px' h='16px'/>}
            </button>
            <button onClick={handleShowComments}>
                {post.comments.length}
                <CommentOutlined w='16px' h='16px'/>
            </button>

            {isAccount && <>
                <button onClick={handleShowUpdatePost}>
            <Icon icon="ant-design:edit-outlined"  w='16px' h='16px'/>
            </button>

            <button onClick={handleDeletePost}>
            <Icon icon="fluent:delete-12-regular"  w='16px' h='16px'/>
            </button>
            </>}
            <button className='post__btn' onClick={handleShowPost}></button>
        </div>
    </div>
        {showLikes && <LikesModel {...{showLikes, handleShowLikes, postId: post._id}}/>}
        {showComments && <CommentsModel {...{showComments, handleShowComments, postId: post._id}}/>}
        {showPost && <PostModel {...{showPost, handleShowPost, postId: post?._id}}/>}
        {showUpdatePost && <UpdatePost {...{showUpdatePost, handleShowUpdatePost, postId:post?._id}}/>}
    </>
  )
}

export default ExPost