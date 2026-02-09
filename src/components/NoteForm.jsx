import { useState } from "react"
import { Button, Form, Card, CloseButton } from "react-bootstrap"
import { addNoteToUserWithId } from "../services/notes.js"

const NoteForm = ({ user, setMessage, setIsNoteFormVisible, isNoteFormVisible }) => {
    const [title, setTitle] = useState("")
    const [noteContent, setNoteContent] = useState("")

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
            setIsNoteFormVisible(false)
            setMessage(`Succesfully created note: ${createdNote.title}`)
            setTimeout(() => {setMessage(null)}, 4000)
        } catch {
            console.log("Tapahtui virhe lisättäessä muistiinpanoa")
        }
    }

    return (
        <Form 
            style={{display: isNoteFormVisible ? "block" : "none"}} 
            onSubmit={handleSubmit}>
            <Card style={{width: "400px"}} className="p-4 shadow d-flex flex-direction-column">
                <CloseButton style={{"marginLeft": "auto"}} variant="red" onClick={() => setIsNoteFormVisible(false)}></CloseButton>

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