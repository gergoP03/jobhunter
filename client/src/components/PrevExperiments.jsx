import React from 'react'
import Loading from './Loading'
import { useUserExperiencesQuery } from '../state/authApiSlice'

const PrevExperiments = () => {
    const {data: userExperiences, isLoading: isExperiencesLoading, isError: isUserExpError} = useUserExperiencesQuery()
    if(isExperiencesLoading){
        return (
            <Loading />
        )
    }
  return (
    <div>
        <div><p><b>Previous experiences</b></p></div>
        {userExperiences.data.length == 0 ? <div><p><b>No previous experiences</b></p></div> : ""}
        <table className="table table-zebra">
            <tbody>
                {userExperiences.data.map(exp => (
                    <tr key={exp.id}>
                    <td>{exp.company}</td>
                    <th>{exp.interval} {exp.title}</th>
                </tr>
                ))}


            </tbody>
        </table>
    </div>
  )
}

export default PrevExperiments