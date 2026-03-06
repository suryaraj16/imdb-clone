function NoteItem({ note, deleteNote }) {

  return (
    <div className="note-item">

      <span>{note.text}</span>

      <button onClick={() => deleteNote(note.id)}>
        Delete
      </button>

    </div>
  );
}

export default NoteItem;
