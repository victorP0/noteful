import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import ErrorPage from '../ErrorBoundary/ErrorPage'
import PropTypes from 'prop-types'

import './AddNote.css'

export default class AddNote extends Component {

constructor(){
  super();
  this.state = {
    name: "",
  }
}

  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  validateName = (name) => {
      if (name.trim ===""){
          alert ('Note name cannot be blank')
      }
  }


  handleSubmit = e => {
    e.preventDefault()
    const noteName = e.target['note-name'].value
    if (noteName.trim !==""){
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })}
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
          <ErrorPage>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name' value = {this.state.name} onChange={e => this.setState({ name: e.target.value})} required/>
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
        </ErrorPage>
      </section>
    )
  }
}

AddNote.defaultProps = {
    name: "",
    content: "",
    folderId: "",
    modified: ""
}

AddNote.propTypes ={
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    modified: PropTypes.date
}