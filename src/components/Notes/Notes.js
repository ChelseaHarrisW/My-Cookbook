// html representation of the note obj added from the form field
import "./Notes.css"
import { useParams } from "react-router"

export const Notes = ({notes, users}) => {

    const {recipeId} = useParams()
    const filteredNotes = notes.filter(note => note.recipeId === parseInt(recipeId))

    return (
        <div className="note-container">
            {
                filteredNotes.map(note => {
                    const foundUser = users.find(user => user.id === note.userId)
                    return <div key={note.id} className="single-note-container">
                    <div key={`note--${note.id}`} className="single-note"> Note added by:<b className="noter">{foundUser?.name}</b> </div>
                    <div> {note.body} </div>
                    </div> 
                }
                )
            }
        </div>
    )
}