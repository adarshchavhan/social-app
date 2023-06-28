import React, { useState } from 'react'
import './Auth.scss'
import LoadingButton from '../../components/LoadingButton/LoadingButton'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { signupUser } from '../../redux/actions/userActions';

const Signup = () => {
  const [data, setData] = useState({name:'', email:'', handle:'', password:'', avatar:''});
  const {mloading, error} = useSelector(state => state.user);
  
  const dispatch = useDispatch();

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
    dispatch(signupUser(data));
  }

  return (
    <div className="auth__page">
      <div className="wrapper">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error__msg">{error}</div>}
          <input type="text" name="name" placeholder='Name' value={data.name} onChange={handleChange} required/>
          <input type="email" name="email" placeholder='Email' value={data.email} onChange={handleChange} required/>
          <input type="text" name="handle" placeholder='handle' value={data.handle} onChange={handleChange} required/>
          <input type="password" name="password" placeholder='Password' value={data.password} onChange={handleChange} required/>
          
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

          <LoadingButton loading={mloading} label={'Sign up'} type='submit'/>
          <span>Have an account? <Link to='/login'>Log in</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Signup