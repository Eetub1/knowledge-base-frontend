import { Button, Form, Card, CloseButton } from "react-bootstrap"
import { useState } from "react"

import { createFolderByUserId } from "../services/folders"

const FolderForm = ({ user, setMessage, setIsFolderFormVisible, isFolderFormVisible }) => {
    const [folderTitle, setFolderTitle] = useState("")
    
    const onSubmit = async event => {
        event.preventDefault()
        console.log("MOI")

        if (!folderTitle) return

        const dataObject = {
            "title": folderTitle,
            "userId": user.id
        }

        try {
            const createdFolder = await createFolderByUserId(dataObject)
            console.log("Luotu folder: ", createdFolder)
            setIsFolderFormVisible(false)
            setFolderTitle("")
            setMessage(`Succesfully created folder: `)
            setTimeout(() => {setMessage(null)}, 4000)
        } catch {
            console.log("Tapahtui virhe luodessa folderia")
        }
    }
    
    return (
        <Form 
            style={{"display" : isFolderFormVisible ? "block" : "none"}}
            onSubmit={onSubmit}>
            <Card style={{width: "400px"}} className="p-4 shadow d-flex flex-direction-column">
                <CloseButton style={{"marginLeft": "auto"}} variant="red" onClick={() => setIsFolderFormVisible(false)}></CloseButton>

                <Form.Group className="mb-3">
                    <Form.Label>Folder title</Form.Label>
                    <Form.Control value={folderTitle} onChange={(event) => setFolderTitle(event.target.value)}></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Create Folder</Button>
            </Card>
        </Form>
    )
}

export default FolderForm