import React from "react";
import Note from "../Note/Note";
import ApiContext from "../ApiContext";
import PropTypes from "prop-types";
import Error from '../Error';
import { findNote } from "../notes-helpers";
import "./NotePageMain.css";

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };
  static contextType = ApiContext;
 handleDeleteNote = noteId => {
   this.props.history.push('/')
 }
  render() {
    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: "" };
    return (
      <Error>
      <section className="NotePageMain">
        <Note id={note.id} name={note.name} modified={note.modified} onDeleteNote={this.handleDeleteNote} />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
      </Error>
    );
  }
}
NotePageMain.propTypes = {
  noteId: PropTypes.string,
  match: PropTypes.object,
  history: PropTypes.object
};
