import React, { Component } from 'react';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';

export default class AddNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            folderId: '',
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

    handleChangeFolder = (folderId) => {
        this.setState({ folderId })
    }

    handleChangeContent = (content) => {
        this.setState({ content })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let mod = new Date();
        const note = {
            name: this.state.title,
            folderId: this.state.folderId,
            content: this.state.content,
            modified: mod
        }
        const url = 'http://localhost:9090/notes'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
                <option value={folder.id} key={folder.id}>{folder.name}</option>
            )
        return(
            <div className='form-container'>
                <h2>Create a New Note</h2>
                <form className='note-form' onSubmit={e => this.handleSubmit(e)}>
                    <input type='text' name='title' placeholder='Title' aria-label='Name your new note' onChange={e => this.handleChangeTitle(e.target.value)} />
                    <select name='folder' aria-label='Select a folder for this note' onChange={e => this.handleChangeFolder(e.target.value)} >
                        {folderOptions}
                    </select>
                    <input type='textarea' name='content' placeholder='Write something...' aria-label='Input the content of your note' onChange={e => this.handleChangeContent(e.target.value)} />
                    <button type='submit' className='submit-button' aria-label='Create new note'>Create</button>
                </form>
            </div>
        );
    }
}

AddNote.propTypes = {
    history: PropTypes.object.isRequired,
}