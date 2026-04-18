const RenderRecentNotes = ({ fiveRecentNotes, setNoteToEdit, setWhatToShow }) => {
    if (fiveRecentNotes.length === 0) return null

    return (
        <>
            <h5>Recent notes</h5>
            <hr/>
            <div>
                {fiveRecentNotes.map(note => (
                    <p onClick={() => {
                        setNoteToEdit(note)
                        setWhatToShow("editNote")
                    }} style={{cursor: "pointer"}} key={note.id}>{note.title}</p>
                ))}
            </div>
        </>
    )
}

export default RenderRecentNotes