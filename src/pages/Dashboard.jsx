import { useState, useEffect } from "react"
import { getUserNotesById} from "../services/notes.js"
import NoteForm from "../components/NoteForm.jsx"

const Dashboard = ({ user, setMessage }) => {
    const [userNotes, setUserNotes] = useState([])

    useEffect(() => {
        const fetchNotes = async () => {
            const notes = await getUserNotesById(user.id)
            setUserNotes(notes)
        }
        if (user.id) fetchNotes()
    }, [])

    return (
        <NoteForm 
            user={user}
            userNotes={userNotes}
            setMessage={setMessage}
        />
    )
}

export default Dashboard
