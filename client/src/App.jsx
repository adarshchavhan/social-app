import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import NoPage from './pages/NoPage/NoPage'
import Login from './pages/Auth/Login'
import {Toaster, toast} from 'react-hot-toast'
import {useDispatch, useSelector} from 'react-redux'
import { loadUser } from './redux/actions/userActions'
import { InstaColor, Loader } from 'react-ig-icons'
import Signup from './pages/Auth/Signup'
import Home from './pages/Home/Home'
import Explore from './pages/Explore/Explore'
import Create from './pages/Create/Create'
import Profile from './pages/Profile/Profile'
import UpdateProfile from './pages/Auth/UpdateProfile'
import UpdatePassword from './pages/Auth/UpdatePassword'
import Search from './pages/Search/Search'
import Messanger from './pages/Messanger/Messanger'

const App = () => {
  const {loading, message, isAuth} = useSelector(state => state.user);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    if(message){
      toast.success(message);
      dispatch({type:'clearMessage'});
    }
  },[message])

  useEffect(()=>{
    dispatch(loadUser());
  },[])

  return loading ? (
    <div className="app__loader">
      <InstaColor w='80' h='80'/>
    </div>) 
    : loading === false && (
      <div className="app">
          <Router>
              {isAuth && <Header/>}
              <Routes>
                  <Route element={<ProtectedRoute isAuth={isAuth}/>}>
                      <Route path='/' element={<Home/>} />
                      <Route path='/explore' element={<Explore/>}/>
                      <Route path='/new' element={<Create/>}/>
                      <Route path='/user/:handle' element={<Profile/>}/>
                      <Route path='/account' element={<Profile isAccount={true}/>}/>
                      <Route path='/edit/account' element={<UpdateProfile/>} />
                      <Route path='/edit/password' element={<UpdatePassword/>}/>
                      <Route path='/search' element={<Search/>} />
                      <Route path='/messages' element={<Messanger/>} />
                      <Route path='*' element={<NoPage/>}/>
                  </Route>
  
                  <Route element={<ProtectedRoute isAuth={!isAuth} redirect='/'/>}>
                      <Route path='/login' element={<Login/>}/>
                      <Route path='/signup' element={<Signup/>}/>
                  </Route>
              </Routes>
          </Router>
          <Toaster/>
      </div>
    )
}

export default App