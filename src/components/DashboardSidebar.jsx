import RenderRecentNotes from "./RenderRecentNotes.jsx"

const DashboardSidebar = ({ userNotes }) => {
    return (
        <>
            <h4>KBase</h4>
            <hr/>
            <RenderRecentNotes fiveMostRecent={userNotes.slice(0, 5)}/>

            
            <h5>Folders</h5>
        </>
    )
}

export default DashboardSidebar