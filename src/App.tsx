import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LoginPage from "./pages/LoginPage"
import Dashboard from './pages/Dashboard'
import Header from './components/Header'

function App() {
  const [user, setUser] = useState(true)

  return (
    <>
      <Header user={user}/>
      <Routes>
        <Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/dashboard"/>}/>
        <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />}/>
      </Routes>
    </>
  )
}

export default App
