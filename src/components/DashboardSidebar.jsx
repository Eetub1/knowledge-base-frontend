import RenderRecentNotes from "./RenderRecentNotes.jsx"
import RenderRecentFolders from "./RenderRecentFolders.jsx"

const DashboardSidebar = ({ userNotes, userFolders, setNoteToEdit, setWhatToShow, setFolderId }) => {
    return (
        <>
            <h4>KBase</h4>
            <hr/>
            <RenderRecentNotes fiveRecentNotes={userNotes.slice(0, 5)} setNoteToEdit={setNoteToEdit} setWhatToShow={setWhatToShow}/>
            <RenderRecentFolders fiveRecentFolders={userFolders.slice(0,5)} setWhatToShow={setWhatToShow} setFolderId={setFolderId}/>
        </>
    )
}

export default DashboardSidebar