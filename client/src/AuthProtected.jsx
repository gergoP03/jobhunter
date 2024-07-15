import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedIn } from './state/authSlice'
import { Navigate } from 'react-router-dom'
import Loading from './components/Loading'

const AuthProtected = ({ children, redirectTo }) => {
    const isLoggedIn = useSelector(selectLoggedIn)


    if(!isLoggedIn){
        return <Navigate to={redirectTo} />
    }
  return (
    <>{children}</>
  )
}

export default AuthProtected