import React from 'react'
import { useDeleteJobMutation, useGetJobsForCompanyQuery } from '../state/jobsApiSlice'
import Loading from './Loading'
import { Link, useNavigate } from 'react-router-dom'

export const CompanyProfile = ({user}) => {
  const navigate = useNavigate();
  const {data: companies, isLoading} = useGetJobsForCompanyQuery(user.id)
  const [deleteJob, {data: deleteData, error: isDeleteError, isLoading: isDeleteLoading}] = useDeleteJobMutation()

  const handleDelete = async (id) => {
      await deleteJob(parseInt(id))
  }

  if(isLoading){
    return (
      <Loading />
    )
  }

  return (
    <div>
      <div><p><b>Your advertisements</b></p></div>
      <table className="table table-zebra">
        <tbody>
        {companies.data.map(company => (
          <tr key={company.id}>

            <td>
              <div>
                <p><b>{company.company} ({company.position})</b></p>
                <div className="flex gap-2">
                  <div className="text-xs">💼{company.type}</div>
                  <div className="text-xs">📌{company.homeOffice ? "Remote" : "Attendance"}</div>
                  <div className="text-xs">💰{company.salaryFrom / 1000}k - {company.salaryTo / 1000}k</div>
                </div>
              </div>
              </td>
            <td>
              <div className="flex gap-3">
                <button className="btn btn-outline" onClick={() => navigate(`/jobs/edit/${company.id}`)}>Edit</button> 
                <button className="btn btn-outline" onClick={() => navigate(`/jobs/applicants/${company.id}`)}>View</button> 
                <button className="btn btn-outline btn-error" onClick={() => handleDelete(company.id)}>Delete</button>
              </div>
            </td>

          </tr>
        ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center p-4">
        <Link to="/jobs/create" className="btn btn-info">Add advertise</Link>
      </div>
     
      
    </div>
  )
}
