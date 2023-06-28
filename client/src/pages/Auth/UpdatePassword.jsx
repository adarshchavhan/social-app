import React, { useEffect, useState } from 'react'
import './Auth.scss'
import LoadingButton from '../../components/LoadingButton/LoadingButton'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { updatePassword } from '../../redux/actions/userActions';

const UpdatePassword = () => {
  const [data, setData] = useState({oldPassword:'', newPassword:''});
  const {mloading, error, message} = useSelector(state => state.user);
  
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(data));
  }

  useEffect(()=>{
    if(message){
        dispatch({type: 'clearMsg'});
        setData({oldPassword:'', newPassword:''});
    }
  },[message])

  return (
    <div className="auth__page">
      <div className="wrapper">
        <h2>Update Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error__msg">{error}</div>}
          <input type="password" name="oldPassword" placeholder='Old Password' value={data.oldPassword} onChange={handleChange} required/>
          <input type="password" name="newPassword" placeholder='New Password' value={data.newPassword} onChange={handleChange} required/>
          <LoadingButton loading={mloading} label={'Update Password'} type='submit' />
          <span>Want to update profile? <Link to='/edit/account'>click here</Link></span>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword