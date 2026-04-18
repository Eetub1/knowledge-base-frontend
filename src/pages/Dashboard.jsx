import { useState, useEffect } from "react"
import { getUserNotesById } from "../services/notes.js"
import { getFoldersByUserId } from "../services/folders.js"
import { Container, Row, Col, Button, Card, Form, CloseButton } from "react-bootstrap"

import NoteForm from "../components/NoteForm.jsx"
import FolderForm from "../components/FolderForm.jsx"
import DashboardSidebar from "../components/DashboardSidebar.jsx"

const Dashboard = ({ user, setMessage }) => {
    const [userNotes, setUserNotes] = useState([])
    const [userFolders, setUserFolders] = useState([])
    const [isNoteFormVisible, setIsNoteFormVisible] = useState(false)
    const [isFolderFormVisible, setIsFolderFormVisible] = useState(false)
    //is null or has all notes or folders
    const [whatToShow, setWhatToShow] = useState("notes")
    const [noteToEdit, setNoteToEdit] = useState(null)

    const addFolder = (newFolder) => {
        setUserFolders(userFolders.concat(newFolder))
    }

    const addNote = (newNote) => {
        setUserNotes(userNotes.concat(newNote))
    }

    //fetch user notes and folders when component mounts
    useEffect(() => {
        const fetchNotesAndFolders = async () => {
            const notes = await getUserNotesById(user.id)
            setUserNotes(notes)

            const folders = await getFoldersByUserId(user.id)
            setUserFolders(folders)
            console.log(folders)
        }
        if (user.id) fetchNotesAndFolders()
    }, [])

    return (
        <Container fluid className="vh-100 p-0">
            <Row className="g-0 h-100">

                <Col xs={3} md={2} className="bg-dark text-white p-3">
                    <DashboardSidebar userNotes={userNotes} userFolders={userFolders}/>
                </Col>

                <Col xs={9} md={10} className="bg-light p-4">
                    <h2>Main Dashboard</h2>

                    <main>

                        <div className="d-flex mb-3">
                            <Button 
                                onClick={() => setIsNoteFormVisible(true)} 
                                style={{marginRight: "7px"}}>
                                Create Note
                            </Button>

                            <Button
                                onClick={() => setIsFolderFormVisible(true)}
                                style={{marginRight: "7px"}}>
                                Create Folder
                            </Button>

                            <Button 
                                onClick={() => setWhatToShow("notes")}
                                style={{marginRight: "7px"}}>
                                Show all Notes
                            </Button>

                            <Button
                                onClick={() => setWhatToShow("folders")}
                                style={{marginRight: "7px"}}>
                                Show all Folders
                            </Button>
                        </div>

                        <FolderForm
                            user={user}
                            setMessage={setMessage}
                            setIsFolderFormVisible={setIsFolderFormVisible}
                            isFolderFormVisible={isFolderFormVisible}
                            addFolder={addFolder}>
                        </FolderForm>

                        <NoteForm
                            user={user} 
                            setMessage={setMessage} 
                            setIsNoteFormVisible={setIsNoteFormVisible}
                            isNoteFormVisible={isNoteFormVisible}
                            addNote={addNote}>
                        </NoteForm>

                        {whatToShow && whatToShow === "notes" && <ShowAllNotes notes={userNotes} setWhatToShow={setWhatToShow} setNoteToEdit={setNoteToEdit}/>}
                        {whatToShow && whatToShow === "folders" && <ShowAllFolders folders={userFolders}/>}
                        {whatToShow && whatToShow === "editNote" && <EditNote note={noteToEdit}/>}
                    </main>

                </Col>

            </Row>
        </Container>
    )
}


const EditNote = ({ note }) => {
    if (!note) return null

    const handleSubmit = event => {
        event.preventDefault()
        console.log("Tallenna muistiinpanoon tehdyt muutokset: ", note)
    }

    return (
        <Form 
            onSubmit={handleSubmit}>
            <Card style={{width: "400px"}} className="p-4 shadow d-flex flex-direction-column">
                <CloseButton style={{"marginLeft": "auto"}} variant="red"></CloseButton>

                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={note.title}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" as="textarea" value={note.content}></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Confirm Changes</Button>
            </Card>
        </Form>
    )
}


const ShowAllFolders = ({ folders }) => {
    if (folders.length === 0) return null

    console.log(folders)

    return (
        <div
            style={{marginTop: "10px"}}
            className="d-flex justify-content-start flex-wrap gap-3 p-3">
            {folders.map(folder => (
                <Card key={folder.id}>
                    <Card.Body>
                        <Card.Title>
                            {folder.name}
                        </Card.Title>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}


const ShowAllNotes = ({ notes, setWhatToShow, setNoteToEdit }) => {
    if (notes.length === 0) return null

    const makeNoteEditable = (note) => {
        console.log("Tehdään muistiinpano editointikuntoon: ", note)
        setWhatToShow("editNote")
        setNoteToEdit(note)
    }

    console.log(notes)

    return (
        <div
            style={{marginTop: "10px"}}
            className="d-flex justify-content-around flex-wrap gap-3 p-3">
            {notes.map(note => (
                <Card style={{cursor: "pointer"}} onClick={() => {makeNoteEditable(note)}} key={note.id}>
                    <Card.Body>
                        <Card.Title style={{borderBottom: "1px solid #ccc"}}>
                            {note.title}
                        </Card.Title>

                        <Card.Text>
                            {note.content}
                        </Card.Text>

                        <Card.Text>
                            {note.folder ? `Folder: ${note.folder.name}` : ""}
                        </Card.Text>

                        <Card.Footer className="d-flex justify-content-center">
                            Created: {new Date(note.created_at).toLocaleDateString()}
                        </Card.Footer>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

export default Dashboard
