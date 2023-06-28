import React, { useEffect, useState } from 'react'
import './UpdatePost.scss'
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '../LoadingButton/LoadingButton';
import { getPost, updatePost } from '../../redux/actions/postActions';

const UpdatePost = ({showUpdatePost, handleShowUpdatePost, postId}) => {
    const [data, setData] = useState({image:'', caption:''});
  const {mloading, error, post} = useSelector(state => state.post);

  const dispatch = useDispatch();

  const handleImage = (e) => {
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = function(){
                setData({...data, image: reader.result});
            }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost(postId, data));
  }

  useEffect(()=>{
   if(showUpdatePost){
    dispatch(getPost(postId));
        setData({image:post?.image.url, caption:post?.caption})
   }
  },[showUpdatePost, post?._id]);

  return (showUpdatePost && post) && (
    <div className="update__post">
        <div className="backdrop" onClick={handleShowUpdatePost}></div>
        <div className="model">
            <h2>Update post</h2>
            <form onSubmit={handleSubmit}>
            {error && <div className="error__msg">{error}</div>}
            
            <div>
                {(data.image) && <img src={data.image} onChange={handleImage}/>}
                <div>
                    <label className='btn'>
                        <input type="file" accept='image/*' id='avatarInput' onChange={handleImage} />
                        <span>{data.image ? 'Change' : 'Upload'} image</span>
                    </label>
                </div>
            </div>

            {data.image && <input type="text" id='imageInput' name="caption" placeholder='Add a caption' value={data.caption} onChange={e => setData({...data, caption: e.target.value})} required/>}

            {(data.image && data.caption) && <LoadingButton loading={mloading} label={'Save Post'} type='submit'/>}
            </form>
        </div>
    </div>
  )
}

export default UpdatePost