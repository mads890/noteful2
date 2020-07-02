import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilesContext from './FilesContext';
import ErrorBoundary from './ErrorBoundary';

export default class ListSidebar extends Component {
    static contextType = FilesContext;

    getNumNotes = (notes, folderId) => {
        let noteArray = notes.filter(note => note.folder_id === folderId)
        return noteArray.length
    }

    render() {
        const { folders, notes } = this.context
        return(
            <section className='list-sidebar'>
                <ErrorBoundary>
                <ul className='folders-list'>
                    {folders.map(folder => 
                        <li key={folder.id} id={folder.id} className='folders-list-item'>
                            <Link to={`/folder/${folder.id}`} className='folder-link'>
                                <p><span>{this.getNumNotes(notes, folder.id)}</span> {folder.title}</p>
                            </Link>
                            <Link to={`edit-folder/${folder.id}`}>Edit Folder</Link>
                        </li>
                    )}
                </ul>
                </ErrorBoundary>
                <Link to='/add-folder' className='add-link'>
                    Add Folder
                </Link>
            </section>
        );
    }
}