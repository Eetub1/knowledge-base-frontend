import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useState } from "react"
import { addNoteToUserWithId } from "../services/notes"

const Dashboard = ({ user, setMessage }) => {
    const [title, setTitle] = useState("")
    const [noteContent, setNoteContent] = useState("")
    const [isFormVisible, setIsFormVisible] = useState(false)

    const handleSubmit = async event => {
        event.preventDefault()

        if (!title || !noteContent) return

        //folderId on nyt null, mutta tulee tarpeen myöhemmin
        const dataObject = {
            "title": title,
            "content": noteContent,
            "id": user.id,
            "folderId": null
        }

        try {
            const createdNote = await addNoteToUserWithId(dataObject)
            setTitle("")
            setNoteContent("")
            setIsFormVisible(false)
            setMessage(`Succesfully created note: ${createdNote.title}`)
            setTimeout(() => {
                setMessage(null)
            }, 4000)
        } catch {
            console.log("Tapahtui virhe lisättäessä muistiinpanoa")
        }
    }  

    const showForm = event => {
        setIsFormVisible(true)
    }

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
                    <Button onClick={showForm} style={{display: isFormVisible ? "none" : "block"}}>Create a new note</Button>

                    <Form style={{display: isFormVisible ? "block" : "none"}} onSubmit={handleSubmit}>
                        <Card style={{width: "400px"}} className="p-4 shadow">
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={title} onChange={(event) => setTitle(event.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control value={noteContent} onChange={(event) => setNoteContent(event.target.value)} placeholder="Your note starts here..." type="text" as="textarea"></Form.Control>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">Create note</Button>
                        </Card>
                    </Form>

                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
