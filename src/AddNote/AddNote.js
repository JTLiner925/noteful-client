import React, { Component } from "react";
import ApiContext from "../ApiContext";
import PropTypes from "prop-types";
import { format } from "date-fns";
import ValidationError from "../ValidationError";
import config from "../config";
import "./AddNote.css";

const Required = () => <span className="AddBookmark__required">*</span>;

//
export default class AddNote extends Component {
  static contextType = ApiContext;
  static defaultProps = {
    notes: [],
    folders: []
  };
  state = {
    selectedDropdown: {
      value: "none",
      touched: false
    },
    name: {
      value: "",
      touched: false
    },
    modified: {
      value: '',
    },
    content: {
      value: "",
      touched: false
    },
    error: {
      message: ""
    }
  };

  handleNoteSubmit = e => {
    e.preventDefault();
    const { name, modified, selectedDropdown, content } = this.state;
    const newNote = {
      name: name.value,
      modified: modified.value,
      folderId: selectedDropdown.value,
      content: content.value
    };
    // if (selectedDropdown === "none") {
    //   this.setState({ error: { message: "please select from dropdown" } });
    //   return;
    // }
    this.setState({ error: null });
    fetch(`${config.API_ENDPOINT}/notes`, {
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
  handleInput = e => {
    this.setState({
      [e.target.name]: { value: e.target.value, touched: true }
    });
  };
  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    }
  }
  validateContent() {
    const name = this.state.content.value.trim();
    if (name.length === 0) {
      return "Some content is required";
    }
  }
  render() {
    const nameError = this.validateName();
    const contentError = this.validateContent();
    const { error } = this.state;
    return (
      <ApiContext.Consumer>
        {value => (
          <section>
            <h2>Create a note</h2>
            <form className="AddNote_form" onSubmit={this.handleNoteSubmit}>
              <div className="AddNote__error" role="alert">
                {error ? <p>{error.message}</p> : null}
              </div>
              <div>
                <label htmlFor="note">
                  Note <Required />
                </label>
                <input
                  onChange={this.handleInput}
                  value={this.state.name.value}
                  type="text"
                  name="name"
                  id="note"
                  placeholder="New Note"
                />
                {this.state.name.touched && (
                  <ValidationError message={nameError} />
                )}{" "}
              </div>
              <div>
                <label htmlFor="folder">
                  Select Folder <Required />
                </label>
                <select
                  value={this.state.selectedDropdown.value}
                  onChange={this.handleInput}
                  name="selectedDropdown"
                  required
                >
                  <option value="none" disabled hidden>
                    No Filter
                  </option>
                  {value.folders.map(folder => {
                  
                    return (
                      <option key={folder.id} value={folder.id}>
                        {folder.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="content">
                  Content <Required />
                </label>
                <input
                  value={this.state.content.value}
                  onChange={this.handleInput}
                  type="text"
                  name="content"
                  id="content"
                  placeholder="description"
                 
                />
                {this.state.content.touched && (
                  <ValidationError message={contentError} />
                )}
              </div>
              <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified{" "}
            <span className="Date" value={this.state.modified.value}>{format(this.state.modified.value, "Do MMM YYYY")}</span>
          </div>
        </div>
              <div className="AddNote__buttons">
                <button type="button" onClick={this.handleClickCancel}>
                  Cancel
                </button>{" "}
                <button
                  type="submit"
                  disabled={
                    this.validateName() ||
                    this.validateContent() ||
                    this.state.selectedDropdown.value === "none"
                  }
                >
                  Save
                </button>
              </div>
            </form>
          </section>
        )}
      </ApiContext.Consumer>
    );
  }
}

AddNote.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};
