import React, { useEffect, useState, useCallback } from "react";
import { FaPencilAlt, FaTrashAlt, FaPlus } from "react-icons/fa";
import axios from "axios";
import { config } from "../config";

function Admin({ socket }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [check, setCheck] = useState(true);

  const addNote = async () => {
    try {
      if (!id) {
        const url = `${config.url}/save`;
        await axios.post(url, {
          title: title,
          text: text,
          date: new Date(),
        });
      } else {
        const url = `${config.url}/edit`;
        await axios.put(url, {
          id: id,
          title: title,
          text: text,
          date: new Date(),
        });
        setId("");
      }
      socket.emit("messageSent", {
        title,
        text,
        date: new Date().toISOString().slice(0, 10),
      });
      setTitle("");
      setText("");
      setCheck(!check);
    } catch (e) {
      throw new Error("Failed in add note", { cause: e });
    }
  };

  const deleteNote = async (id) => {
    try {
      const url = `${config.url}/delete/${id}`;
      await axios.delete(url);
      setCheck(!check);
    } catch (e) {
      throw new Error("Failed in delete note", { cause: e });
    }
  };

  const editNote = (note) => {
    setTitle(note.title);
    setText(note.text);
    setId(note._id);
  };

  useEffect(() => {
    async function getNotes() {
      const url = `${config.url}/notes`;
      const response = await axios.get(url);
      setNotes(response.data);
    }
    getNotes();
  }, [check]);

  return (
    <div className="admin-container">
      <label htmlFor="title">Заголовок</label>
      <textarea
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        rows="5"
        cols="33"
        maxLength="240"
      ></textarea>
      <label htmlFor="text">Текст</label>
      <textarea
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="5"
        cols="33"
      ></textarea>
      <button onClick={addNote} className="add">
        <FaPlus />
      </button>
      <div>
        <ul>
          {notes.map((note) => {
            return (
              <li key={note._id}>
                <p>{note.title}</p>
                <div>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="delete"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => editNote(note, note._id)}
                    className="edit"
                  >
                    <FaPencilAlt />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
