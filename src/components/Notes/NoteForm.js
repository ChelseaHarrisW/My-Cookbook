import { useState, useEffect } from "react"
import { useParams } from "react-router"
import "./NoteForm.css"
import { useHistory } from "react-router"
import { getAllNotes } from "../Api-Manager"


export const NoteForm = ({setNotes}) => {
    const history = useHistory() 
    const {recipeId} = useParams()
    const [note, setNote] = useState({
        body: "",
        userId: null,
        recipeId: null
    })
    
    const saveNote = () => {
        const noteObject = {
            userId: parseInt(localStorage.getItem("cook_user")),
            body: note.body,
            recipeId: parseInt(recipeId)
        }
        // use fetch method POST to save object into API

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(noteObject)
        }
        return fetch("http://localhost:8088/notes", fetchOption)
        .then(clearNote())
    }
    const clearNote = () => {
        const copy = {...note}
        copy.body = ""
        setNote(copy)
        update()
    }
    // updates notes state
    const update = () => {
        getAllNotes()
            .then((data) => {
                setNotes(data)
            })
    }
    return (
        <article className="note-form">
            <h3>Type Notes Here</h3>
            <textarea
                        required
                        type="text"
                        className="note"
                        placeholder="Note here..."
                        value={note.body}
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...note}
                                // modify copy of state with user input value
                                copy.body = evt.target.value
                                // update state with new state
                                setNote(copy)
                            }
                        } />
                    <button className="save-note" onClick={saveNote}>Save Note</button>
        </article>
    )
}