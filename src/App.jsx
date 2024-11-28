import React from 'react'
import Signup from './pages/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './components/Home'

const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App

