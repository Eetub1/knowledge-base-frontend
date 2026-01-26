import LoginPage from "./pages/LoginPage"
import { useState } from 'react'

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      {!user && <LoginPage />}
      {user && <div>Terve terve tervaperse!</div>}
    </>
  )
}

export default App
