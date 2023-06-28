import React, { useEffect } from 'react'
import './LikesModel.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../../redux/actions/postActions';
import { Link } from 'react-router-dom';
import { Avatar } from 'react-ig-icons';

const LikesModel = ({showLikes, handleShowLikes, postId}) => {
    const {mloading, post} = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(showLikes){
            dispatch(getPost(postId));
        }
    },[postId]);

  return mloading===false && (
    <div className="likes__model">
        <div className="backdrop" onClick={handleShowLikes}></div>
        <div className="model">
            <h2>Liked by</h2>
            {post && <div className="list__wrapper">
              {post.likes.length > 0 && <p>Total {post?.likes.length} likes</p>}
                <div>
                    {post?.likes.length > 0 ? <>
                        {post.likes.map(user => (
                        <div className="user__card" key={user._id}>
                        <Link to={`/user/${user.handle}`}>
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

export default LikesModel