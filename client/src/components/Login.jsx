import React, { useState } from 'react'
import Header from './Header'
import { useLoginMutation } from '../state/userApiSlice';
import { Navigate, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedIn, setLoginState } from '../state/authSlice';
import Loading from './Loading';

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const[login, { data, error, isLoading }] = useLoginMutation();
 // const {data: infoData, isLoading: isInfoLoading, isError: isInfoError, refetch} = useInfoQuery()
 const dispatch = useDispatch();
 const isLoggedIn = useSelector(selectLoggedIn)



  const handleChange = (e) => {
    //console.log(formState)
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ ...formState, strategy: 'local' });
      const { user, accessToken } = response.data;
      dispatch(setLoginState({ user, accessToken: accessToken }));
      //localStorage.setItem('token', accessToken)
      //localStorage.setItem('user', JSON.stringify(user)) 
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      // Kezelheted a hibát a felhasználói felületen
    }
  }
/*
  const isValidToken = (token) => {
    console.log(isInfoError)
    return token && !isInfoError
  };
  if(isInfoLoading){
    console.log("tölt")
    return <Loading />
    
  }
    */

  /* Itt lehet megvárni amíg betöltődnek a cookiek frissítéskor ha használjuk */

  /*
   if(!isLoggedIn && (cookies.token && cookies.user)){
    return (<Loading />)
   }
    */
    

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    
    <div className="card w-96 bg-base-100 shadow-xl mx-auto m-8">
      <div className="card-body">
      <h2 className="card-title">Login</h2>
      {error && <div className="text-error">{error.data.message}</div>}
      <form onSubmit={handleLogin}>
  <label className="form-control w-full max-w-xs">
    <div className="label">
      <span className="label-text">Email</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
    </div>
    
    <input required type="text" name='email' className="input input-bordered w-full max-w-xs" placeholder="Email" vlaue={formState.email} onChange={handleChange} />
  </label>
  <label className="form-control w-full max-w-xs">
    <div className="label">
      <span className="label-text">Password</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
    </div>
    
    <input required type="password" name='password' className="input input-bordered w-full max-w-xs" value={formState.password} onChange={handleChange} />
  </label>
  <div className="flex justify-center items-center p-4">
    <input className="btn text-xl" type="submit" value="Login"/>
  </div>
  
  </form>
  </div>
  </div>
  
  )
}

export default Login