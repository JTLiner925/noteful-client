import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import "./AddNote.css";

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)
export default class AddNote extends Component {
  static contextType = ApiContext;
  static defaultProps = {
    notes: [],
    folders: []
  };
  state = {
    error: null
  };

  handleNoteSubmit = e => {
    e.preventDefault();

    const { name, folder, content } = e.target;
    const newNote = {
      name: name.value,
      folder: folder.value,
      content: content.value
    };
    this.setState({ error: null });
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        name.value = "";
        folder.value = "";
        content.value = "";
        this.context.addNote(data);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  handleClickCancel = () => {
    this.props.history.push("/");
  };
  render() {
    const { error } = this.state;
    return (
      <section>
        <h2>Create a note</h2>
        <form className="AddNote_form" onSubmit={this.handleSubmit}>
          <div className="AddNote__error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='note'>
              Note
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='note'
              id='note'
              placeholder='New Note'
              required
            />            
          </div>
          <div>
            <label htmlFor='folder'>
              Folder
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='folder'
              id='folder'
              placeholder='current folder'
              required
            />           
          </div>
          <div>
            <label htmlFor='content'>
              Content
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='content'
              id='content'
              placeholder='description'
              required
            />            
          </div>
          <div className='AddNote__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}
