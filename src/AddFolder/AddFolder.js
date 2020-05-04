import React, { Component } from "react";
import ApiContext from "../ApiContext";
import PropTypes from 'prop-types';
import config from "../config";
import "./AddFolder.css";

const Required = () => (
  <span className='AddFolder__required'>*</span>
)

export default class AddFolder extends Component {
  static contextType = ApiContext;
  static defaultProps ={
    folders: [],
  }
  state = {
    error: null
  };

  handleSubmit = e => {
    e.preventDefault();

    const { folder } = e.target;
    const newFolder = {
      name: folder.value
    };
    this.setState({ error: null });
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      body: JSON.stringify(newFolder),
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
        folder.value = "";
        this.context.addFolder(data);
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
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <form className='AddFolder_form' onSubmit={this.handleSubmit}>
        <div className='AddFolder__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='folder'>
              Folder
              {' '}
              <Required />
            </label>
            <input
            defaultValue={this.props.name}
              type='text'
              name='folder'
              id='folder'
              placeholder='New Folder'
              required
            />
          </div>
          <div className='AddFolder__buttons'>
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
AddFolder.defaultProps ={
  name: ''
}
AddFolder.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
}
