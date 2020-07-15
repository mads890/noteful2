import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Note from './Note';
import FilesContext from './FilesContext';
import ErrorBoundary from './ErrorBoundary';
import PropTypes from 'prop-types';
import API_TOKEN from '../config';

export default class ListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
    }
    static contextType = FilesContext;

    handleDeleteFolder = (e) => {
        e.preventDefault();
        const id = e.target.id
        const url = `https://cryptic-brook-62254.herokuapp.com/api/folders/${id}`
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN.API_TOKEN}`
            }
        }
        fetch(url, options)
        .then(response => {
            if (!response.ok) {
                return response
                .then(err => Promise.reject(err))
            }
            return response
        })
        .finally(() => {
            this.context.deleteFolder(id)
            this.props.history.push('/')
            window.location.reload()
        })
        .catch(err => {
            console.error({ err })
        })
    }

    matchFolderNotes = (notes, folderId) => {
        if (folderId) {
            const filteredNotes = notes.filter(note => note.folder_id === folderId)
            return filteredNotes
        }
        return notes
    }

    handleGoBack = () => {
        this.props.history.push('/')
    }

    render() {
        const folder_id = parseInt(this.props.match.params.folderId)
        const { notes } = this.context
        const folderNotes = this.matchFolderNotes(notes, folder_id)
        const deleteFolder = folder_id 
        ? <button
            id={folder_id} 
            type='button'
            onClick={e => this.handleDeleteFolder(e)}
            className='delete-button'
            disabled={folderNotes.length > 0 ? true : false}
        >
            Delete Folder
        </button>
        : ''
        return(
            <section className='list-main'>
                <ErrorBoundary>
                <ul className='notes-list'>
                    {folderNotes.map(note => 
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                title={note.title}
                                date={note.modified}
                                onDeleteNote={this.handleGoBack}
                            />
                        </li>
                    )}
                </ul>
                </ErrorBoundary>
                <Link to='/add-note' className='add-link'>
                    Add Note
                </Link>
                <section>
                    {deleteFolder}
                </section>
            </section>
        );
    }
}

ListMain.propTypes = {
    match: PropTypes.object.isRequired
}