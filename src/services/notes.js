import axios from "axios"

export const addNoteToUserWithId = async data => {
    const response = await axios.post("http://localhost:5000/api/notes", data)
    return response.data
}

export const getUserNotesById = async userId => {
    const response = await axios.get(`http://localhost:5000/api/notes/${userId}`)
    return response.data
}

export const updateNoteById = async (editedNote, noteId) => {
    const response = await axios.put(`http://localhost:5000/api/notes/${noteId}`, editedNote)
    return response.data
}

export const deleteNoteById = async noteId => {
    await axios.delete(`http://localhost:5000/api/notes/${noteId}`)
}