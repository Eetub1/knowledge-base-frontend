import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"

import Header from './components/Header'

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      <Header user={user} setUser={setUser}/>
      <Routes>
        <Route path="/login" element={!user ? <LoginPage setUser={setUser}/> : <Navigate to="/dashboard"/>}/>
        <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
        <Route path="/about" element={user ? <About/> : <Navigate to="/login"/>}/>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />}/>
      </Routes>
    </>
  )
}

export default App
