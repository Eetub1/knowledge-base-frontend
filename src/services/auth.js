import axios from "axios"

//handles login
export const login = async credentials => {
    const response = await axios.post("http://localhost:5000/api/login", credentials)
    return response.data
}

//handles creating a new user
export const signUp = async credentials => {
    const response = await axios.post("http://localhost:5000/api/users", credentials)
    return response.data
}
