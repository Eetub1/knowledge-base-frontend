import { useState } from "react"
import { Button, Form, Card, CloseButton } from "react-bootstrap"
import { addNoteToUserWithId } from "../services/notes.js"

const NoteForm = ({ user, setMessage, addNote, setWhatToShow }) => {
    const [title, setTitle] = useState("")
    const [noteContent, setNoteContent] = useState("")

    const handleSubmit = async event => {
        event.preventDefault()

        if (!title || !noteContent) return

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
            setWhatToShow("notes")
            addNote(createdNote)
            setMessage(`Succesfully created note: ${createdNote.title}`)
            setTimeout(() => {setMessage(null)}, 4000)
        } catch {
            console.log("Error when adding a note")
        }
    }

    return (
        <Form
            className="d-flex justify-content-center align-items-center"
            onSubmit={handleSubmit}>
            <Card style={{width: "400px"}} className="p-4 shadow d-flex flex-direction-column">
                <CloseButton style={{"marginLeft": "auto"}} variant="red" onClick={() => setWhatToShow("notes")}></CloseButton>

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
    )
}

export default NoteForm