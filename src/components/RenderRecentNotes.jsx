const RenderRecentNotes = ({ fiveMostRecent }) => {
    if (fiveMostRecent.length === 0) return null

    return (
        <>
            <h5>Recent notes:</h5>
            <hr/>
            <div>
                {fiveMostRecent.map(note => (
                    <p key={note.id}>{note.title}</p>
                ))}
            </div>
            <hr/>
        </>
    )
}

export default RenderRecentNotes