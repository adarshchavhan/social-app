import React, { useState } from 'react'
import './Auth.scss'
import LoadingButton from '../../components/LoadingButton/LoadingButton'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../../redux/actions/userActions';

const Login = () => {
  const [data, setData] = useState({userId:'', password:''});
  const {mloading, error} = useSelector(state => state.user);
  
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(data));
  }

  return (
    <div className="auth__page">
      <div className="wrapper">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error__msg">{error}</div>}
          <input type="text" name="userId" placeholder='Email or handle' value={data.userId} onChange={handleChange} required/>
          <input type="password" name="password" placeholder='Password' value={data.password} onChange={handleChange} required/>
          <LoadingButton loading={mloading} label={'Log in'} type='submit' />
          <span>Don't have an account? <Link to='/signup'>Sign up</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login