import axios from "axios"

export const addNoteToUserWithId = async data => {
    const response = await axios.post("http://localhost:5000/api/notes", data)
    return response.data
}

export const getUserNotesById = async userId => {
    console.log("userId: ", userId)
    const response = await axios.get(`http://localhost:5000/api/notes/${userId}`)
    console.log("Vastaus: ", response)
    return response.data
}

//export const getNoteById