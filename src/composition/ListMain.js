import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Note from './Note';
import FilesContext from './FilesContext';
import ErrorBoundary from './ErrorBoundary';
import PropTypes from 'prop-types';

export default class ListMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
    }
    static contextType = FilesContext;

    matchFolderNotes = (notes, folderId) => {
        if (!folderId) {
            return notes
        }
        else {
            return notes.filter(note => note.folder_id === folderId)
        }
    }

    handleGoBack = () => {
        this.props.history.push('/')
    }

    render() {
        const { folder_id } = this.props.match.params
        const { notes } = this.context
        const folderNotes = this.matchFolderNotes(notes, folder_id)
        const handleGoBack = this.handleGoBack
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
                                onDeleteNote={handleGoBack}
                            />
                        </li>
                    )}
                </ul>
                </ErrorBoundary>
                <Link to='/add-note' className='add-link'>
                    Add Note
                </Link>
            </section>
        );
    }
}

ListMain.propTypes = {
    match: PropTypes.object.isRequired
}