import RenderRecentNotes from "./RenderRecentNotes.jsx"
import RenderRecentFolders from "./RenderRecentFolders.jsx"

const DashboardSidebar = ({ userNotes, userFolders }) => {
    return (
        <>
            <h4>KBase</h4>
            <hr/>
            <RenderRecentNotes fiveRecentNotes={userNotes.slice(0, 5)}/>
            <RenderRecentFolders fiveRecentFolders={userFolders.slice(0,5)}/>
        </>
    )
}

export default DashboardSidebar