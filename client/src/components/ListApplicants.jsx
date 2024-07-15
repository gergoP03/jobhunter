import React from 'react'
import Loading from './Loading';
import { useGetOneJobQuery } from '../state/jobsApiSlice';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { selectLoggedIn, selectUser } from '../state/authSlice';
import { useGetApplicantsForAJobQuery } from '../state/authApiSlice';

const ListApplicants = () => {
    const { id } = useParams();
    const { data: job, isLoading, isError: isJobError } = useGetOneJobQuery(id)
    const { data: applicants, isLoading: isApplicantsLoading } = useGetApplicantsForAJobQuery(id)
    const isLoggedIn = useSelector(selectLoggedIn)
    const user = useSelector(selectUser)



    if (isLoading || isApplicantsLoading) {
        return (
            <Loading />
        )
    }

    if (!job) {
        return (
            <div className="flex justify-center items-center"><p className="text-error"><b>No job with id: {id}</b></p></div>
        )
    }

    //ha nem company
    if (user && user.role != "company") {
        return <Navigate to="/" />;
    }
    //ha nem az övé
    if (user && user.id != job.userId) {
        return (<Navigate to="/" />)
    }

    



    return (
        <div className="card m-5 w-1/2 bg-base-100 shadow-xl mx-auto">
            <p className="m-4 text-2xl"><b>Applicants for job</b></p>
            <div className="card-body">
                <div className='flex justify-between'>
                    <div className="text-lg"><p><b>Company Details</b></p></div>
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
                <div className="font-bold text-lg">Applicants for this job:</div>
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th className="py-4 px-6"> {/* Adjust padding */}
                                Name
                            </th>
                            <th className="py-4 px-6"> {/* Adjust padding */}
                                Email
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map(app => (
                            <tr key={app.user.id}>
                                <th>{app.user.fullname}</th>
                                <td>{app.user.email}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListApplicants