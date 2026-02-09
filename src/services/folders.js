import axios from "axios"

export const getFoldersByUserId = async userId => {
    const response = await axios.get(`http://localhost:5000/api/folders/${userId}`)
    return response.data
}

export const createFolderByUserId = async data => {
    const response = await axios.post("http://localhost:5000/api/folders", data)
    return response.data
}