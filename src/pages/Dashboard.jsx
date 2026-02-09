import { useState, useEffect } from "react"
import { getUserNotesById} from "../services/notes.js"
import { Container, Row, Col, Button } from "react-bootstrap"

import NoteForm from "../components/NoteForm.jsx"
import FolderForm from "../components/FolderForm.jsx"
import DashboardSidebar from "../components/DashboardSidebar.jsx"


const Dashboard = ({ user, setMessage }) => {
    const [userNotes, setUserNotes] = useState([])
    const [isNoteFormVisible, setIsNoteFormVisible] = useState(false)
    const [isFolderFormVisible, setIsFolderFormVisible] = useState(false)

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
                    <DashboardSidebar userNotes={userNotes}/>
                </Col>

                <Col xs={9} md={10} className="bg-light p-4">
                    <h2>Main Dashboard</h2>
                    <Button 
                        onClick={() => setIsNoteFormVisible(true)} 
                        style={{display: isNoteFormVisible ? "none" : "block"}}>
                        Create a new Note
                    </Button>

                    <Button
                        onClick={() => setIsFolderFormVisible(true)}
                        style={{display: isFolderFormVisible ? "none" : "block"}}>
                        Create a new Folder
                    </Button>

                    <FolderForm
                        user={user}
                        setMessage={setMessage}
                        setIsFolderFormVisible={setIsFolderFormVisible}
                        isFolderFormVisible={isFolderFormVisible}
                    ></FolderForm>

                    <NoteForm 
                        user={user} 
                        setMessage={setMessage} 
                        setIsNoteFormVisible={setIsNoteFormVisible}
                        isNoteFormVisible={isNoteFormVisible}
                    />
                </Col>

            </Row>
        </Container>
    )
}

export default Dashboard
