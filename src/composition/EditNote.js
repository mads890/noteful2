import React, { Component } from 'react';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';
import API_TOKEN from '../config';

export default class EditNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            folder_id: '',
            content: ''
        }
    }

    static defaultProps = {
        history: {},
        match: {},
    }
    static contextType = FilesContext;

    handleChangeTitle = (title) => {
        this.setState({ title })
    }

    handleChangeFolder = (id) => {
        let folder_id = parseInt(id)
        this.setState({ folder_id })
    }

    handleChangeContent = (content) => {
        this.setState({ content })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let mod = new Date();
        const id = parseInt(this.props.match.params.noteId)
        const note = {
            title: this.state.title,
            folder_id: this.state.folder_id,
            content: this.state.content,
            modified: mod
        }
        const url = `http://localhost:8000/api/notes/${id}`
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN.API_TOKEN}`
            },
            body: JSON.stringify(note)
        }
        fetch(url, options)
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }
            return res
        })
        .then(resJson => {
            this.context.patchNote(resJson)
            this.props.history.push('/')
            window.location.reload()
        })
        .catch(err => {
            console.error({ err })
        })
    }

    getNote = (notes, id) => {
        const note = notes.find(note => note.id === id)
        return note;
    }

    render() {
        const id = parseInt(this.props.match.params.noteId)
        const { notes } = this.context
        const note = this.getNote(notes, id)
        const { folders } = this.context;
        const folderOptions = folders.map(folder =>
                <option value={folder.id} key={folder.id}>{folder.title}</option>
            )
        return (
            <section className='form-container'>
                <h2>Edit Note {note.title}</h2>
                <form className='note-form' onSubmit={e => this.handleSubmit(e)}>
                    <input type='text' required aria-required name='title' aria-label='Update the name of this note' defaultValue={note.title} onChange={e => this.handleChangeTitle(e.target.value)}></input>
                    <select name='folder' required aria-required aria-label='Change the folder for this note' defaultValue='default' onChange={e => this.handleChangeFolder(e.target.value)} >
                        <option value='default' name='default' disabled>Select a Folder</option>
                        {folderOptions}
                    </select>
                    <input type='textarea' required aria-required name='content' aria-label='Update the content of this note' defaultValue={note.content} onChange={e => this.handleChangeContent(e.target.value)}></input>
                    <button type='submit' className='submit-button' aria-label='Update note'>Update</button>
                </form>
            </section>
        )
    }
}

EditNote.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
}