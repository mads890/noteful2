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
    }
    static contextType = FilesContext;

    handleChangeTitle = (title) => {
        this.setState({ title })
    }

    handleChangeFolder = (folder_id) => {
        this.setState({ folder_id })
    }

    handleChangeContent = (content) => {
        this.setState({ content })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let mod = new Date();
        const note = {
            title: this.state.title,
            folder_id: this.state.folder_id,
            content: this.state.content,
            modified: mod
        }
        const url = 'http://localhost:8000/api/notes/:id'
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify(note)
        }
        fetch(url, options)
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }
            return res.json()
        })
        .then(resJson => {
            this.context.patchNote(resJson)
            this.props.history.push('/')
        })
        .catch(err => {
            console.error({ err })
        })
    }

    handleInitialState = (note) => {
        this.setState({
            title: note.title
            folder_id: note.folder_id
            content: note.content
        })
    }

    getNote = (notes, id) => {
        const note = notes.find(note => note.id === id)
        return note;
    }

    render() {
        const { id } = this.props.match.params
        const { notes } = this.context
        const note = getNote(notes, id)
        this.handleInitialState(note)
        const { folders } = this.context;
        const folderOptions = folders.map(folder => 
                <option value={folder.id} key={folder.id}>{folder.title}</option>
            )
        return (
            <section className='form-container'>
                <h2>Edit Note {this.state.title}</h2>
                <form className='note-form' onSubmit={e => this.handleSubmit(e)}>
                    <input type='text' required aria-required name='title' placeholder={this.state.title} aria-label='Update the name of this note' onChange={e => this.handleChangeTitle(e.target.value)} />
                    <select name='folder' required aria-required aria-label='Change the folder for this note' onChange={e => this.handleChangeFolder(e.target.value)} >
                        {folderOptions}
                    </select>
                    <input type='textarea' required aria-required placeholder={this.state.content} name='content' aria-label='Update the content of this note' onChange={e => this.handleChangeContent(e.target.value)} />
                    <button type='submit' className='submit-button' aria-label='Update note'>Update</button>
                </form>
            </section>
        )
    }
}