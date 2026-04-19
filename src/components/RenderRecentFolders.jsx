const RenderRecentNotes = ({ fiveRecentFolders, setWhatToShow, setFolderId }) => {
    if (fiveRecentFolders.length === 0) return null

    return (
        <>
            <hr/>
            <h5>Folders</h5>
            <hr/>
            <div>
                {fiveRecentFolders.map(folder => (
                    <p 
                        onClick={() => {setWhatToShow("showFolderNotes"); setFolderId(folder.id)}}
                        style={{cursor: "pointer"}} 
                        key={folder.id}>{folder.name}</p>
                ))}
            </div>
        </>
    )
}

export default RenderRecentNotes