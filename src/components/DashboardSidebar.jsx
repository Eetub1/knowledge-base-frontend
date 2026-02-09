import RenderRecentNotes from "./RenderRecentNotes.jsx"

const DashboardSidebar = ({ userNotes, userFolders }) => {
    return (
        <>
            <h4>KBase</h4>
            <hr/>
            <RenderRecentNotes fiveMostRecent={userNotes.slice(0, 5)}/>


            <h5>Folders</h5>
            <hr/>
        </>
    )
}

export default DashboardSidebar