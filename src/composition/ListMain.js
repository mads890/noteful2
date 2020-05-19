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
        }
    }
    static contextType = FilesContext;

    matchFolderNotes = (notes, folderId) => {
        if (folderId == '') {
            return notes
        }
        else {
            document.getElementById(folderId).toggleClass('selected')
            return notes.filter(note => note.folderId === folderId)
        }
    }

    render() {
        const { folderId } = this.props.match.params
        const { notes } = this.context
        const folderNotes = this.matchFolderNotes(notes, folderId)
        return(
            <section className='list-main'>
                <ErrorBoundary>
                <ul className='notes-list'>
                    {folderNotes.map(note => 
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                title={note.name}
                                date={note.modified}
                            />
                        </li>
                    )}
                </ul>
                </ErrorBoundary>
                <Link to='/add-note' className='add-note-link'>
                    Add Note
                </Link>
            </section>
        );
    }
}

ListMain.propTypes = {
    match: PropTypes.object.isRequired,
}