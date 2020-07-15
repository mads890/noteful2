import React, { Component } from 'react';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';
import API_TOKEN from '../config'

export default class AddNote extends Component {

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
        const note = {
            title: this.state.title,
            folder_id: this.state.folder_id,
            content: this.state.content,
            modified: mod
        }
        const url = `https://cryptic-brook-62254.herokuapp.com/api/notes`
        const options = {
            method: 'POST',
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
            return res.json()
        })
        .then(resJson => {
            this.context.addNote(resJson)
            this.props.history.push('/')
        })
        .catch(err => {
            console.error({ err })
        })
    }

    render() {
        const { folders } = this.context;
        const folderOptions = folders.map(folder => 
                <option value={folder.id} key={folder.id}>{folder.title}</option>
            )
        return(
            <section className='form-container'>
                <h2>Create a New Note</h2>
                <form className='note-form' onSubmit={e => this.handleSubmit(e)}>
                    <input type='text' required aria-required name='title' placeholder='Title' aria-label='Name your new note' onChange={e => this.handleChangeTitle(e.target.value)} />
                    <select name='folder' required aria-required aria-label='Select a folder for this note' defaultValue='default' onChange={e => this.handleChangeFolder(e.target.value)} >
                        <option value='default' name='default' disabled>Select a Folder</option>
                        {folderOptions}
                    </select>
                    <input type='textarea' required aria-required name='content' placeholder='Write something...' aria-label='Input the content of your note' onChange={e => this.handleChangeContent(e.target.value)} />
                    <button type='submit' className='submit-button' aria-label='Create new note'>Create</button>
                </form>
            </section>
        );
    }
}

AddNote.propTypes = {
    history: PropTypes.object.isRequired,
}