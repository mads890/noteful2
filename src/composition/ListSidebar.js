import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilesContext from './FilesContext';

export default class ListSidebar extends Component {
    static contextType = FilesContext;

    getNumNotes = (notes, folderId) => {
        let noteArray = notes.filter(note => note.folderId === folderId)
        return noteArray.length
    }

    render() {
        const { folders, notes } = this.context
        return(
            <section className='list-sidebar'>
                <ul className='folders-list'>
                    {folders.map(folder => 
                        <li key={folder.id}>
                            <Link to={`/folder/${folder.id}`} className='folder-link'>
                                <p><span>{this.getNumNotes(notes, folder.id)}</span> {folder.name}</p>
                            </Link>
                        </li>
                    )}
                </ul>
                <Link to='/add-folder' className='add-folder-link'>
                    Add Folder
                </Link>
            </section>
        );
    }
}