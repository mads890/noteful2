import React, { Component } from 'react';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';

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
        const id = this.props.match.params
        if (notes.length > 0) {
            const note = this.getNote(notes, id.noteId)
            const folder = this.getFolder(folders, note.folderId)
            return (
                <section className='note-sidebar'>
                    <div className='folder-title'>
                        <h3>{folder.name}</h3>
                    </div>
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