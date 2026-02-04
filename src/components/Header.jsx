import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Header = ({user, setUser}) => {
    if (!user) return null

    const logout = event => {
        setUser(null)
    }

    return (
        <Navbar bg="dark" variant="dark" expand="md" className="shadow-sm">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    </Nav>

                    <Nav className="align-items-center">
                        <span className="navbar-text me-3 small">
                            Logged in as {user?.username}
                        </span>
                        <Button onClick={logout} variant="outline-light" size="sm" className="px-3">Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
