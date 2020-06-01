import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'

export default class NotePageNav extends Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {
        note_id:[]
      }
    }
  }
  static contextType = ApiContext;

  render() {
    const { notes, folders, } = this.context;
    const  note_id  = this.props.match.params.note_id;
    const note = findNote(notes, note_id) || {}
    const folder = findFolder(folders, note.folder_id)
    console.log(findNote)
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.folder_name}
          </h3>
        )}
      </div>
    )
  }
}
