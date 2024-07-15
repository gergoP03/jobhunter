import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useUserInfoQuery } from '../state/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedIn, selectUser, setLoginState, setLogoutState } from '../state/authSlice';



const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  //!! Elég itt behúzni, mert ez a komponens minden oldalon szerepel
  /*
    useEffect(() => {
      if (cookies.token && cookies.user) {
        dispatch(setLoginState({ accessToken: cookies.token, user: cookies.user }));
      }

    }, [cookies.token, cookies.user]);
    */

  const isLoggedIn = useSelector(selectLoggedIn)
  const user = useSelector(selectUser)
  




  const handleLogout = () => {
    

    //localStorage.removeItem('user')
    //localStorage.removeItem('token')
    dispatch(setLogoutState())
    navigate('/');
    
  };


  


  if(isLoggedIn){
    return(
      <div className="navbar bg-base-300 rounded-bl-xl rounded-br-xl">
        <Link to="/" className="btn text-xl"><b>JH</b></Link>
        <Link to="/profile" className="btn btn-ghost text-xl">My Profile ({user.fullname})</Link>
        {user.role == "company" && <Link to="/jobs/create" className="btn btn-ghost text-xl">Add Job Advertisement</Link>}
        <a className="btn btn-ghost text-xl" onClick={handleLogout}>Log out</a>
    </div>
    )
  }
  return (
    <div className="navbar bg-base-300 rounded-bl-xl rounded-br-xl">
        <Link to="/" className="btn text-xl"><b>JH</b></Link>
        <Link to="/register" className="btn btn-ghost text-xl">Register</Link>
        <Link to="/login" className="btn btn-ghost text-xl">Login</Link>
    </div>
  )
}

export default Header