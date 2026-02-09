const RenderRecentNotes = ({ fiveMostRecent }) => {
    if (fiveMostRecent.length === 0) return null

    return (
        <>
            <p>Recent notes:</p>
            <hr/>
            <div>
                {fiveMostRecent.map(note => (
                    <p key={note.id}>{note.title}</p>
                ))}
            </div>
        </>
    )
}

export default RenderRecentNotes