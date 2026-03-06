import { useState, useEffect } from "react";
import NoteItem from "./components/NoteItem";
import "./App.css";

function App() {

  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (input.trim() === "") return;

    const newNote = {
      id: Date.now(),
      text: input
    };

    setNotes([...notes, newNote]);
    setInput("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="app-container">

      <h1>Notes App</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Write a note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={addNote}>
          Add Note
        </button>
      </div>

      <div className="notes-list">
        {notes.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            deleteNote={deleteNote}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
