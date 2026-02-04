import { useState } from "react"
import { Form, Button, Container, Card } from "react-bootstrap"
import { signUp } from "../services/auth.js"

const SignUpPage = ({setUser, setMessage}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = async event => {
        event.preventDefault()
        console.log("Moroo")

        try {
            const newUser = await signUp({username, password})
            setUser(newUser)    
            setUsername("")
            setPassword("")
            setMessage("Succesfully signed up and logged in!")
            setTimeout(() => {
                setMessage(null)
            }, 4000)
        } catch {
            console.log("There was an error in signing up")
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <Card style={{ width: "400px"}} className="p-4 shadow">
                <h2 className="text-center mb-4">Sign up</h2>
                <Form onSubmit={handleSignUp}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">Sign up</Button>
                </Form>
            </Card>
        </Container>
    )
}

export default SignUpPage
