import axios from "axios"

export const addNoteToUserWithId = async data => {
    const response = await axios.post("http://localhost:5000/api/notes", data)
    return response.data
}

export const getUserNotesById = async userId => {
    const response = await axios.get(`http://localhost:5000/api/notes/${userId}`)
    return response.data
}

//export const getNoteById