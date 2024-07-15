import React from 'react'
import Header from '../Header'
import JobList from './components/JobList'


const MainPage = () => {
 


  return (
    <div className="bg-white min-h-screen">
      
        

      <p className="m-4 text-2xl"><b>Main Page</b></p>
      <div id="content" className="flex justify-center items-center h-full mx-auto w-full">
        <JobList />
      </div>

    </div>
  )
}

export default MainPage