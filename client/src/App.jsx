import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home.jsx'
import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import Dashboard from './pages/dashboard.jsx'
import Forgot from './pages/forgot-pass.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/signup' element = {<Signup/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/dashboard' element = {<Dashboard />}/>
        <Route path = '/forgot-pass' element = {<Forgot/>}/>
      </Routes>
    </div>
  )
}

export default App