import React from 'react';
import Search from './Search';
import Filter from './Filter';
import { useGetJobsQuery } from '../../../state/jobsApiSlice';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
    const {data: jobs, isLoading} = useGetJobsQuery()
    const navigate = useNavigate();
    

    if(isLoading || !jobs){
        return (
            <Loading />
        )
    }
    //console.log(isLoading, jobs)
    return (
        <div className="overflow-x-auto p-4 w-auto">
            <div id="search-and-filter" className='flex justify-center items-center gap-4'>
                <Search />
                <Filter /> 
            </div>
        <table className="table w-full">
            {/* head */}
            <thead>
            <tr>
                <th className="py-4 px-6"> {/* Adjust padding */}
                Job Name
                </th>
                <th className="py-4 px-6"> {/* Adjust padding */}
                Details
                </th>

            </tr>
            </thead>
            <tbody>
            {jobs.data.map(job => (
                        <tr key={job.id} className="hover" onClick={() => navigate(`jobs/${job.id}`)}>
                            <td className="py-4 px-6 text-lg">
                                <div>
                                    <p className='text-lg'><b>{job.company}</b></p>
                                    <p className='text-sm'>{job.city} ({job.position})</p>
                                </div></td>
                            <td className="py-4 px-6 text-lg">
                                <div>
                                <p><b>{job.salaryFrom}-{job.salaryTo} HUF</b></p>
                                <p className='text-sm'>{job.type} (📌{job.homeOffice ? "Home office" : "No Home office"})</p>
                                </div></td>
                        </tr>
                    ))}
           
            {/* row 1 */}
            
            </tbody>
        </table>
        </div>
    );
};

export default JobList;
