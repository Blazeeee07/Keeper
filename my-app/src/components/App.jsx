import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const fetchNotes = () => {
    axios.get('https://keeper-backend-26pv.onrender.com/list')
      .then(result => setNotes(result.data))
      .catch(err => console.log(err));
  };

  useEffect(()=>{
    fetchNotes();
  },[])
  function addNote1(newNote) {
    axios.post('https://keeper-backend-26pv.onrender.com/add', newNote).then(result => {
      fetchNotes();
    }).catch(err => console.log(err));
  }
  
  function deleteNote(id) {
    axios.delete('https://keeper-backend-26pv.onrender.com/delete/' + id).then(result => {
      fetchNotes();
    }).catch(err => console.log(err));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote1} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={()=>{deleteNote(noteItem._id)}}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
