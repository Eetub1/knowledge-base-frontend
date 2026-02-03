import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = ({ user }) => {
    //jos ei ole käyttäjää niin ei piirretä headeria
    if (!user) return null

    return (
        <Navbar bg="dark" variant="dark" expand="md" className="mb-4 shadow-sm">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/notes">Notes</Nav.Link>
                </Nav>

                <Nav className="align-items-center">
                    <span className="navbar-text me-3 small">
                    {user?.username}
                    </span>
                    <Button variant="outline-light" size="sm" className="px-3">Logout</Button>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header