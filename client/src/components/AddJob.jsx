import React, { useState } from 'react'
import { useCreateJobMutation } from '../state/jobsApiSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectUser } from '../state/authSlice';
import Loading from './Loading';

export const AddJob = () => {
    //const { cookies, setCookie, removeCookie } = useCookieContext();
    const navigate = useNavigate();
    const [createJob, { data, error, isLoading }] = useCreateJobMutation()

    const [formState, setFormState] = useState({
        company: '',
        position: '',
        description: '',
        salaryFrom: 0,
        salaryTo: 0,
        type: "full-time",
        city: '',
        homeOffice: false,
    });
    const isLoggedIn = useSelector(selectLoggedIn)
    const user = useSelector(selectUser)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormState((prevJobData) => ({
            ...prevJobData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const jobData = {
            ...formState,
            salaryFrom: Number(formState.salaryFrom),
            salaryTo: Number(formState.salaryTo),
        };
        try {
            await createJob(jobData).unwrap();
            navigate('/');
        } catch (e) {
            console.error(e.status);
        }
        
    };

        
    
      if (user && user.role != "company") {
        return <Navigate to="/" />;
      }

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl bold font-bold mb-6">Create job advertisement</h2>
            {error && <div className="text-error">Unsuccessful creation, please fill every input field with right input</div>}
            <form onSubmit={handleSubmit} className="w-1/3">
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg">Company name:</span>
                        </div>
                        <input
                            className="input input-bordered grow w-full"
                            type="text"
                            name="company"
                            value={formState.company}
                            onChange={handleChange}
                            required
                        />

                    </label>

                </div>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg">Position:</span>
                        </div>
                        <input
                            className="input input-bordered grow"
                            type="text"
                            name="position"
                            value={formState.position}
                            onChange={handleChange}
                            required
                        />

                    </label>
                </div>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg">Description:</span>
                        </div>

                        <textarea
                            className="textarea textarea-bordered h-24 w-full"
                            name="description"
                            value={formState.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg">Salary from:</span>
                        </div>
                        <input
                            className="input input-bordered  w-full"
                            type="number"
                            name="salaryFrom"
                            value={formState.salaryFrom}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg">Salary To:</span>
                        </div>
                        <input
                            className="input input-bordered  w-full"
                            type="number"
                            name="salaryTo"
                            value={formState.salaryTo}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg">Employment type:</span>
                        </div>
                        <select
                            className="select select-bordered w-full"
                            name="type"
                            value={formState.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part-time</option>
                            <option value="internship">Internship</option>
                        </select>

                    </label>

                </div>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg">City:</span>
                        </div>
                        <input
                            className="input input-bordered  w-full"
                            type="text"
                            name="city"
                            value={formState.city}
                            onChange={handleChange}
                            required
                        />
                    </label>

                </div>
                
                <div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                        <span className="label-text text-lg">Is there home office?</span>
                        <input
                           
                            type="checkbox"
                            name="homeOffice"
                            checked={formState.homeOffice}
                            onChange={handleChange}  className="checkbox" />
                            
                            
                        </label>
                    </div>
                </div>
                <div className="flex justify-center items-center p-4">
                    <button type="submit" className="btn btn-outline btn-info">Create job advertisement</button>
                </div>
                
            </form>

        </div>
    );
}
