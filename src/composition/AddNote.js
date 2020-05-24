import React, { Component } from 'react';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';

export default class AddNote extends Component {

    static defaultProps = {
        history: {},
    }
    static contextType = FilesContext;

    handleSubmit = (e) => {
        e.preventDefault();
        const url = 'http://localhost:9090/notes'
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        }
        fetch(url, options)
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }
            return res.json()
        })
        .then(resJson => {
            this.context.addNote()
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
                <form className='note-form' onSubmit={e => this.handleSubmit(e)}>
                    <input type='text' name='title' value='Note Title' aria-label='Name your new note' />
                    <select name='folder' aria-label='Select a folder for this note'>
                        {folderOptions}
                    </select>
                    <button type='submit' value='Create' aria-label='Create new note' />
                </form>
            </div>
        );
    }
}

AddNote.propTypes = {
    history: PropTypes.object.isRequired,
}