import { Button } from "react-bootstrap"
import { useOutletContext } from "react-router-dom"

const DashboardHome = () => {
    const { setIsNoteFormVisible, setIsFolderFormVisible } = useOutletContext()

    return (
        <div>
            <h2>Welcome to your KBase</h2>
            <p>Select a note from the sidebar or create something new.</p>
            <div className="d-flex gap-2">
                <Button onClick={() => setIsNoteFormVisible(true)}>Create Note</Button>
                <Button onClick={() => setIsFolderFormVisible(true)}>Create Folder</Button>
            </div>
        </div>
    )
}

export default DashboardHome