import React, { Component } from 'react';
import ApiContext from "../ApiContext";
import config from '..config/';
import './AddNote.css';

export default class AddNote extends Component {
  static contextType = ApiContext;
  static defaultProps ={
    notes: [],
    folders: [],

  }
  state = {
    error: null,
  };

  handleNoteSubmit = e => {
    e.preventDefault()

    const { name, folder, content } = e.target
    const newNote = {
      name: name.value,
      folder: folder.value,
      content: content.value,
    }
    this.setState({ error: null })
    fetch()
  }
  render() {
    return (
      <form>
        
      </form>
    )
  }
}
