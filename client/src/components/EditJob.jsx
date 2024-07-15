import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectUser } from '../state/authSlice';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { jobsApi, useGetOneJobQuery, useUpdateJobMutation } from '../state/jobsApiSlice';
import Loading from './Loading';

export const EditJob = () => {
  const navigate = useNavigate();
  const [updateJob, { error }] = useUpdateJobMutation();
  const {id} = useParams();
  const {data: job, isLoading, isError: isJobError} = useGetOneJobQuery(id)
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

//useEffect nélkül nem működött
useEffect(() => {
  
  if (job) {
    setFormState({
      company: job.company,
      position: job.position,
      description: job.description,
      salaryFrom: job.salaryFrom,
      salaryTo: job.salaryTo,
      type: job.type,
      city: job.city,
      homeOffice: Boolean(job.homeOffice),
    });
  }
}, [job]);
//console.log(formState.homeOffice)

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
    //console.log(jobData.homeOffice)
    try {
      await updateJob({ id: id, ...jobData }).unwrap();
        navigate('/profile');
    } catch (e) {
        console.error(e.status);
    }
    
};

if(isLoading){
  return ( 
    <Loading />
  )
}
if(isJobError){
  return (
    <Navigate to="/" />
  )
}
    
  //ha nem company
  if (user && user.role != "company") {
    return <Navigate to="/" />;
  }
  //ha nem az övé
  if(user && user.id != job.userId){
    return (<Navigate to="/" />)
  }

return (
    <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl bold font-bold mb-6">Edit job advertisement</h2>
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
                <button type="submit" className="btn btn-outline btn-info">Update job advertisement</button>
            </div>
            
        </form>

    </div>
);
}

