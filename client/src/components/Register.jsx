import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useRegisterMutation } from '../state/userApiSlice';
import { selectLoggedIn, setLoginState } from '../state/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from './Loading';

const Register = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({ email: '', password: '', fullname: '', role: 'company'});
    const [experiences, setExperiences] = useState('')
    //const [login, { data, error, isLoading }] = useLoginMutation();
    const [register, { data: registerData, error: registerError, isLoading: isRegisterLoading }] = useRegisterMutation();
    // const {data: infoData, isLoading: isInfoLoading, isError: isInfoError, refetch} = useInfoQuery()
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectLoggedIn)

    const handleExpChange = (e) => {
        setExperiences(e.target.value)
    }

    const handleChange = (e) => {
        //console.log(formState)
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const handleRegister = async () => {
        try {
            await register({ ...formState }).unwrap();
            navigate('/login');
        } catch (e) {
            console.error(e.status);
        }
    }

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto m-8">
            <div className="card-body">
                <h2 className="card-title">Register</h2>
                {registerError && <div className="text-error">Unsuccessful registration</div>}

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Email</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    </div>

                    <input required type="text" name='email' className="input input-bordered w-full max-w-xs" placeholder="Email" vlaue={formState.email} onChange={handleChange} />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Username</span>
                        
                    </div>

                    <input required type="text" name='fullname' className="input input-bordered w-full max-w-xs" placeholder="Username" vlaue={formState.fullname} onChange={handleChange} />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Password</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    </div>

                    <input type="password" name='password' className="input input-bordered w-full max-w-xs" value={formState.password} onChange={handleChange} />
                </label>
                <div className='flex justify-center items-center'>
                    <label className='mr-4'>
                        <input required type="radio" name="role" value="company" checked={formState.role === 'company'} onChange={handleChange} />
                        Company
                    </label>
                    <label>
                        <input type="radio" name="role" value="jobseeker" checked={formState.role === 'jobseeker'} onChange={handleChange} />
                        Job Seeker
                    </label>
                </div>
                {formState.role === 'jobseeker' && (
                    <label className="form-control">
                        <div className="label">
                        <span className="label-text">Previous Experiment</span>
                        
                        </div>
                        <textarea
                            name="experiences"
                            className="textarea textarea-bordered h-24"
                            placeholder="Enter your previous work experiences (include workplace, position, start-end years)"
                            value={experiences}
                            onChange={handleExpChange}
                        />
                    </label>
                )}
                 <div className="flex justify-center items-center p-4">
                 <input className="btn text-xl" type="submit" value="Register" onClick={handleRegister} />
                 </div>
                

            </div>
        </div>
    )
}

export default Register