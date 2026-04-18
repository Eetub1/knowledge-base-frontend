import { useState, useEffect } from "react"
import { getUserNotesById } from "../services/notes.js"
import { getFoldersByUserId } from "../services/folders.js"
import { Container, Row, Col, Button, Card, Form, CloseButton } from "react-bootstrap"

import NoteForm from "../components/NoteForm.jsx"
import FolderForm from "../components/FolderForm.jsx"
import DashboardSidebar from "../components/DashboardSidebar.jsx"

import { updateNoteById } from "../services/notes.js"

const Dashboard = ({ user, setMessage }) => {
    const [userNotes, setUserNotes] = useState([])
    const [userFolders, setUserFolders] = useState([])
    const [isNoteFormVisible, setIsNoteFormVisible] = useState(false)
    const [isFolderFormVisible, setIsFolderFormVisible] = useState(false)
    //is empty string or has all notes or folders or editNote
    const [whatToShow, setWhatToShow] = useState("notes")
    const [noteToEdit, setNoteToEdit] = useState(null)
    const [folderId, setFolderId] = useState(noteToEdit && noteToEdit.folder_id ? noteToEdit.folder_id : "")

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
        <Container fluid className="p-0 min-vh-100 d-flex flex-column">
            <Row className="g-0 flex-grow-1">

                <Col xs={3} md={2} className="bg-dark text-white p-3">
                    <DashboardSidebar userNotes={userNotes} userFolders={userFolders} setNoteToEdit={setNoteToEdit} setWhatToShow={setWhatToShow}/>
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
                        {whatToShow && whatToShow === "editNote" && <EditNote
                                                                        key={noteToEdit.id} 
                                                                        note={noteToEdit} 
                                                                        userFolders={userFolders} 
                                                                        folderId={folderId} 
                                                                        setFolderId={setFolderId}
                                                                        setWhatToShow={setWhatToShow}
                                                                        userNotes={userNotes}
                                                                        setUserNotes={setUserNotes}
                                                                        setMessage={setMessage}/>}
                    </main>
                </Col>
            </Row>
        </Container>
    )
}


const EditNote = ({ note, userFolders, folderId, setFolderId, setWhatToShow, userNotes, setUserNotes, setMessage }) => {
    if (!note) return null

    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    const handleSubmit = async event => {
        event.preventDefault()
        console.log("Tallenna muistiinpanoon tehdyt muutokset: ", note)

        const noteId = note.id

        const editedNote = {
            ...note, 
            content: content,
            title: title,
            folder_id: folderId ? folderId : null
        }

        try {
            const editedNoteFromBackend = await updateNoteById(editedNote, noteId)

            const updatedNotes = userNotes.map(note => note.id === noteId ? editedNoteFromBackend : note)
            setUserNotes(updatedNotes)
            setWhatToShow("notes")
            setMessage("Note edited succesfully!")
            setTimeout(() => {setMessage(null)}, 4000)
        } catch (error) {
            console.error("Error when editing note:", error.message)
        }
    }

    return (
        <Form 
            className="d-flex justify-content-center align-items-center"
            onSubmit={handleSubmit}>
            <Card style={{width: "400px"}} className="p-4 shadow d-flex flex-direction-column">
                <CloseButton onClick={() => setWhatToShow("notes")} style={{"marginLeft": "auto"}} variant="red"></CloseButton>

                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={title} onChange={(event) => setTitle(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Folder</Form.Label>
                    <Form.Select 
                        value={folderId} 
                        onChange={(e) => setFolderId(e.target.value)}>
                        <option value="">No Folder (Unassigned)</option>
                        {userFolders.map(folder => (
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" as="textarea" value={content} onChange={(event) => setContent(event.target.value)}></Form.Control>
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
    if (notes.length === 0) return <p className="text-muted mt-3">No notes found.</p>

    const makeNoteEditable = (note) => {
        setWhatToShow("editNote")
        setNoteToEdit(note)
    }

    return (
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
            {notes.map(note => (
                <Col key={note.id} className="d-flex">
                    <Card 
                        className="h-100 shadow-sm border-0 w-100" 
                        style={{ cursor: "pointer", transition: "transform 0.2s" }}
                        onClick={() => makeNoteEditable(note)}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="fw-bold border-bottom pb-2 mb-3">
                                {note.title || "Untitled"}
                            </Card.Title>

                            <Card.Text className="flex-grow-1 text-secondary">
                                {note.content.length > 150 
                                    ? `${note.content.substring(0, 150)}...` 
                                    : note.content}
                            </Card.Text>

                            <div className="mt-3">
                                {note.folder && (
                                    <span className="badge bg-info text-dark mb-2">
                                        📁 {note.folder.name}
                                    </span>
                                )}
                            </div>

                            <Card.Footer className="bg-transparent border-0 text-muted small p-0 mt-2">
                                Created: {new Date(note.created_at).toLocaleDateString()}
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default Dashboard
