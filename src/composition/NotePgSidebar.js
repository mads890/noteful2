import React, { Component } from 'react';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class NotePgSidebar extends Component {
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }
    static contextType = FilesContext;

    getNote = (noteList, id) => {
        const note = noteList.find(note => note.id === id)
        return note;
    }

    getFolder = (folderList, id) => {
        const folder = folderList.find(folder => folder.id === id)
        return folder;
    }

    render() {
        const { notes, folders } = this.context
        const id = parseInt(this.props.match.params.noteId)
        if (notes.length > 0) {
            const note = this.getNote(notes, id)
            const folder = this.getFolder(folders, note.folder_id)
            return (
                <section className='note-sidebar'>
                    <header className='folder-title'>
                        <h3>{folder.title}</h3>
                    </header>
                    
                    <button
                        type='button'
                        className='edit-link'
                    >
                        <Link to={`/edit-note/${id}`}>Edit Note</Link>
                    </button>
                    <button
                        type='button'
                        className='back-button'
                        onClick={() => this.props.history.goBack()}
                    >
                        Back
                    </button>
                </section>
            );
        }
        else return <div></div>
    }
}

NotePgSidebar.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}