import React from 'react'
import { useGetOneJobQuery } from '../state/jobsApiSlice';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectUser } from '../state/authSlice';
import { useDeleteApplyMutation, useGetApplicantsForAJobQuery, useGetJobsForApplicantQuery, useUserApplyMutation } from '../state/authApiSlice';


const OneJob = () => {
    const {id} = useParams();
    const {data: job, isLoading, isError: isJobError} = useGetOneJobQuery(id)
    const isLoggedIn = useSelector(selectLoggedIn)
    const user = useSelector(selectUser)
    const {data: applicants, isLoading: isApplicantsLoading } = useGetApplicantsForAJobQuery(id)
    const [userApply , { data: applyData, error: isApplyError, isLoading: isApplyLoading }] = useUserApplyMutation()
    const [deleteApply, {data: deleteData, error: isDeleteError, isLoading: isDeleteLoading}] = useDeleteApplyMutation()

    const handleApply = async () => {
        const app = applicants.find(e => e.userId == user.id)
        if(app){
            
            await deleteApply(parseInt(id))
        }
        else{
            await userApply({jobId: parseInt(id)})
        }
        
    }



    if(isLoading || isApplicantsLoading){
        return (
            <Loading />
        )
    }


    if(!job){
        return(
            <div className="flex justify-center items-center"><p className="text-error"><b>No job with id: {id}</b></p></div>
        )
    }

  return (

    <div className="card m-5 w-1/2 bg-base-100 shadow-xl mx-auto">
    <div className="card-body">
    <div className='flex justify-between'>
        <div className="text-2xl"><p><b>Company Details</b></p></div>
        {(isLoggedIn && user.role == "jobseeker") && <button onClick={handleApply} className='btn'>{applicants.find(e => e.userId == user.id) ? "Applied" : "Apply"}</button>}
    </div>
    <table className="table table-zebra">
            <tbody>
                <tr>
                    <th>Company:</th>
                    <td>{job.company}</td>
                </tr>
                <tr>
                    <th>Position:</th>
                    <td>{job.position}</td>
                </tr>
                <tr>
                    <th>Description:</th>
                    <td>{job.description}</td>
                </tr>
                <tr>
                    <th>Salary:</th>
                    <td>{job.salaryFrom} - {job.salaryTo} Ft</td>
                </tr>
                <tr>
                    <th>Type:</th>
                    <td>{job.type}</td>
                </tr>
                <tr>
                    <th>City:</th>
                    <td>{job.city}</td>
                </tr>
                <tr>
                    <th>Home Office:</th>
                    <td>{job.homeOffice ? 'Yes' : 'No'}</td>
                </tr>

            </tbody>
        </table>
        </div>
        </div>
  )
}

export default OneJob