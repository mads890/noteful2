import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Note from './Note';
import FilesContext from './FilesContext';

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
        else return notes.filter(note => note.folderId === folderId)
    }

    render() {
        const { folderId } = this.props.match.params
        const { notes } = this.context
        const folderNotes = this.matchFolderNotes(notes, folderId)
        return(
            <section className='list-main'>
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
                <Link to='/add-note' className='add-note-link'>
                    Add Note
                </Link>
            </section>
        );
    }
}