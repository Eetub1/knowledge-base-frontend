import axios from "axios"

export const addNoteToUserWithId = async data => {
    const response = await axios.post("http://localhost:5000/api/notes", data)
    console.log("Vastaus: ", response)
    return response.data
}