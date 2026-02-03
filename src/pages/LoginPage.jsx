import { useState } from "react"
import { Form, Button, Container, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { login } from "../services/login.js"

const LoginPage = ({setUser, setMessage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await login({username, password})
      console.log(user)
      setUser(user)
      setUsername("")
      setPassword("")
      setMessage("Login succesful!")
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    } catch {
      console.log("There was an error in login")
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <Card style={{ width: "400px"}} className="p-4 shadow">
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">Login</Button>

          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <Link to="/signup" style={{textDecoration: "none"}}>Sign Up</Link>
          </div>
        </Form>
      </Card>
    </Container>
  )
}

export default LoginPage