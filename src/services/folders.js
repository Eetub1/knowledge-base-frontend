import axios from "axios"

export const createFolderByUserId = async data => {
    const response = await axios.post("http://localhost:5000/api/folders", data)
    console.log(data)
    console.log("JUU")
    return response.data
}