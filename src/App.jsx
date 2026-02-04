import { Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"

import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Profile from "./pages/Profile"

import Header from "./components/Header"
import Message from "./components/Message"

function App() {
    const [user, setUser] = useState(true)
    const [message, setMessage] = useState("")

    return (
        <>
            <Header user={user} setUser={setUser}/>
            {message && <Message message={message}/>}
            <Routes>
                <Route path="/signup" element={!user ? <SignUpPage setUser={setUser} setMessage={setMessage}/> : <Navigate to="/dashboard"/>}/>
                <Route path="/login" element={!user ? <LoginPage setUser={setUser} setMessage={setMessage}/> : <Navigate to="/dashboard"/>}/>
                <Route path="/profile" element={user ? <Profile user={user}/> : <Navigate to="/login"/>}/>
                <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
                <Route path="/about" element={user ? <About/> : <Navigate to="/login"/>}/>
                <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"}/>}/>
            </Routes>
        </>
    )
}

export default App
