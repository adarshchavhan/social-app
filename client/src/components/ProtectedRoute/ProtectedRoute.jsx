import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({isAuth, redirect='/login'}) => {
  if(!isAuth){
    return <Navigate to={redirect}/>
  }

  return <Outlet/>
}

export default ProtectedRoute