import { useState, useEffect } from "react"
import { getUserNotesById} from "../services/notes.js"
import NoteForm from "../components/NoteForm.jsx"
import { Container, Row, Col, Button } from "react-bootstrap"
import RenderRecentNotes from "../components/RenderRecentNotes.jsx"

const Dashboard = ({ user, setMessage }) => {
    const [userNotes, setUserNotes] = useState([])
    const [isFormVisible, setIsFormVisible] = useState(false)

    useEffect(() => {
        const fetchNotes = async () => {
            const notes = await getUserNotesById(user.id)
            setUserNotes(notes)
        }
        if (user.id) fetchNotes()
    }, [])

    return (
        <Container fluid className="vh-100 p-0">
            <Row className="g-0 h-100">
                <Col xs={3} md={2} className="bg-dark text-white p-3">
                    <h4>KBase</h4>
                    <hr/>
                    <RenderRecentNotes fiveMostRecent={userNotes.slice(0, 5)}/>
                </Col>

                <Col xs={9} md={10} className="bg-light p-4">
                    <h2>Main Dashboard</h2>
                    <Button onClick={() => setIsFormVisible(true)} style={{display: isFormVisible ? "none" : "block"}}>Create a new note</Button>
                    <NoteForm 
                        user={user} 
                        setMessage={setMessage} 
                        setIsFormVisible={setIsFormVisible}
                        isFormVisible={isFormVisible}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
