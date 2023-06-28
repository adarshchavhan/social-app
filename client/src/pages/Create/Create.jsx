import React, { useEffect, useState } from 'react'
import './Create.scss'
import LoadingButton from '../../components/LoadingButton/LoadingButton'
import {useDispatch, useSelector} from 'react-redux'
import { signupUser } from '../../redux/actions/userActions';
import { createPost } from '../../redux/actions/postActions';
import { toast } from 'react-hot-toast';

const Create = () => {
  const [data, setData] = useState({image:'', caption:''});
  const {mloading, error, message} = useSelector(state => state.post);
  
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
      dispatch(createPost(data));
    }
    
    useEffect(()=>{
        if(message){
            toast.success(message);
            dispatch({type: 'clearMsg'});
            setData({image:'', caption:''});
            document.getElementById('imageInput').value = '';
    }
  },[message, dispatch]);

  return (
    <div className="create__page">
      <div className="wrapper">
        <h2>Create new post</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error__msg">{error}</div>}
        
          <div>
            {data.image && <img src={data.image} onChange={handleImage}/>}
            <div>
                <label className='btn'>
                    <input type="file" accept='image/*' id='avatarInput' onChange={handleImage} />
                    <span>{data.image ? 'Change' : 'Upload'} image</span>
                </label>
            </div>
          </div>

          {data.image && <input type="text" id='imageInput' name="caption" placeholder='Add a caption' value={data.caption} onChange={e => setData({...data, caption: e.target.value})} required/>}

          {(data.image && data.caption) && <LoadingButton loading={mloading} label={'Create Post'} type='submit'/>}
        </form>
      </div>
    </div>
  )
}

export default Create