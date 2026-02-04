import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"

const Dashboard = () => {
    return (
        <Container fluid className="vh-100 p-0">
            <Row className="g-0 h-100">
                <Col xs={3} md={2} className="bg-dark text-white p-3">
                    <h4>KBase</h4>
                    <hr />
                    <p>Links go here</p>
                </Col>

                <Col xs={9} md={10} className="bg-light p-4">
                    <h2>Main Dashboard</h2>
                    <Button>Create a new note</Button>

                    <Form>
                        <Card style={{ width: "400px"}} className="p-4 shadow">
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control></Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control placeholder="Your note starts here..." type="text" as="textarea"></Form.Control>
                            </Form.Group>
                        </Card>
                    </Form>

                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
