import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedIn, selectUser, setLoginState } from '../state/authSlice'
import { Navigate } from 'react-router-dom'
import { useUserExperiencesQuery, useUserInfoQuery } from '../state/authApiSlice'
import Loading from './Loading'
import PrevExperiments from './PrevExperiments'
import { CompanyProfile } from './CompanyProfile'


export const Profile = () => {
    
    const dispatch = useDispatch()

    //Cookies megoldás volt, de már nincs a kódban
    //Azért kell, mert a redux állapottér alapján olvassuk ki hogy a felhasználó hitelesített-e és be kell tölteni
    //dispatch(setLoginState({accessToken: cookies.token, user: cookies.user}))




    const isLoggedIn = useSelector(selectLoggedIn)
    const user = useSelector(selectUser)
    //console.log(user)

    const { data: userData, isLoading: isUserDataLoading, isError: isUserDataError, error } = useUserInfoQuery(user?.id || '');
    


    
    if(!user || !(typeof user === 'object') || !('id' in user)){
        return(
            <Navigate to="/" />
        )
    }
    //const {data: userData, isLoading: isUserDataLoading, isError: isUserDataError} = useUserInfoQuery(user.id)
    

    if(isUserDataLoading){
        return (
            <Loading />
        )
    }

    
        return (
            <div className="card m-5 w-2/3 bg-base-100 shadow-xl mx-auto">
                <p className="m-4 text-2xl"><b>My profile</b></p>
    <div className="card-body">
    <div className='flex justify-between'>
        <div><p><b>Personal data</b></p></div>
        {userData.role == "jobseeker" && <button className='btn'>Edit experiences</button>}
    </div>
    <table className="table table-zebra">
            <tbody>
                <tr>
                    <th>Name:</th>
                    <td>{userData.fullname}</td>
                </tr>
                <tr>
                    <th>Email:</th>
                    <td>{userData.email}</td>
                </tr>
                <tr>
                    <th>Status:</th>
                    <td>{userData.role == "jobseeker" ? "Jobseeker" : "Company"}</td>
                </tr>

            </tbody>
        </table>
        {userData.role == "jobseeker" && <PrevExperiments />}
        {userData.role == "company" && <CompanyProfile user={userData} />}
        
        </div>
        </div>
        )
    


}
