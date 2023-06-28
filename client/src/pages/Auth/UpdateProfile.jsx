import React, { useEffect, useState } from 'react'
import './Auth.scss'
import LoadingButton from '../../components/LoadingButton/LoadingButton'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { getUser, loadUser, updateUser } from '../../redux/actions/userActions';

const UpdateProfile = () => {
  const [data, setData] = useState({name:'', email:'', handle:'', bio:'', avatar:''});
  const {mloading, error, user,  message, profile: pro} = useSelector(state => state.user);
  
  const dispatch = useDispatch();
const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value
    })
  }

  const handleAvatar = (e, type) => {
    if(type=='remove'){
        setData({...data, avatar: ''});
        document.getElementById('avatarInput').value = '';
    }else{
        
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = function(){
                setData({...data, avatar: reader.result});
            }
        }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(data));
  }

  useEffect(()=>{
    dispatch(getUser(user.handle));
  },[user.handle])

  useEffect(()=>{
    if(pro){
        setData({name:pro.name, email:pro.email, handle: pro.handle, bio:pro.bio?pro.bio:'', avatar:pro.avatar.url?pro.avatar.url:''});
    }
    if(message){
        navigate('/account');
        dispatch({type: 'clearMsg'})
    }
  },[message])

  return (
    <div className="auth__page">
      <div className="wrapper">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error__msg">{error}</div>}
          <input type="text" name="name" placeholder='Name' value={data.name} onChange={handleChange} required/>
          <input type="email" name="email" placeholder='Email' value={data.email} onChange={handleChange} required/>
          <input type="text" name="handle" placeholder='handle' value={data.handle} onChange={handleChange} required/>
          <input type="text" name="bio" placeholder='Bio' value={data.bio} onChange={handleChange} />
          
          <div>
            {data.avatar && <img src={data.avatar}/>}
            <div>
                <label className='btn'>
                    <input type="file" accept='image/*' id='avatarInput' onChange={handleAvatar} />
                    <span>Upload avatar</span>
                </label>
                {data.avatar && <button type="button" className='btn' onClick={()=>handleAvatar({}, 'remove')}>Remove avatar</button>}
            </div>
          </div>

          <LoadingButton loading={mloading} label={'Update Profile'} type='submit'/>
          <span>Want to change password? <Link to='/edit/password'>click here</Link></span>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile