const RenderRecentNotes = ({ fiveRecentFolders }) => {
    if (fiveRecentFolders.length === 0) return null

    return (
        <>
            <hr/>
            <h5>Folders</h5>
            <hr/>
            <div>
                {fiveRecentFolders.map(folder => (
                    <p style={{cursor: "pointer"}} key={folder.id}>{folder.name}</p>
                ))}
            </div>
        </>
    )
}

export default RenderRecentNotes