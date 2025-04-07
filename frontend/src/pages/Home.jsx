import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"
function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
// call this as soon as page loads
    useEffect(() => {
        getNotes();
    }, []);
// to get all of the notes
    const getNotes = () => {
        
        api.get("/api/notes/").then((res) => res.data).then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => { // take the id of the note that you want to delete 
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted successfully!");
                else alert("Failed");
                getNotes(); // will update the screen and show remaining notes
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault(); // prevent the default action of the form
        api 
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created successfully!");
                else if (res.status === 400) alert("Bad request.");
                else if (res.status === 403) alert("Permission denied.");
                else if (res.status === 500) alert("Internal server error.");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Notes</h2> 
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;