import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from './components/MainPage/MainPage'
import Layout from './Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import OneJob from './components/OneJob'
import { Profile } from './components/Profile'
import { AddJob } from './components/AddJob'
import AuthProtected from './AuthProtected'
import { EditJob } from './components/EditJob'
import ListApplicants from './components/ListApplicants'



function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs/:id" element={<OneJob />} />
          <Route path="/profile" element={<AuthProtected redirectTo='/login'><Profile /></AuthProtected>} />
          <Route path="/jobs/create" element={<AuthProtected redirectTo='/login'><AddJob /></AuthProtected>} />
          <Route path="/jobs/edit/:id" element={<AuthProtected redirectTo='/login'><EditJob /></AuthProtected>} />
          <Route path="/jobs/applicants/:id" element={<AuthProtected redirectTo='/login'><ListApplicants /></AuthProtected>} />
        </Routes>
        
      </Layout>
    </BrowserRouter>
    
  )
}

export default App
