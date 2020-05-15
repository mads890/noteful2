import React, { Component } from 'react';
import FilesContext from './FilesContext';

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
        noteList.find(note => note.id === id)
    }

    getFolder = (folderList, id) => {
        folderList.find(folder => folder.id === id)
    }

    render() {
        const { notes, folders } = this.context
        const { id } = this.props.match.params
        const note = this.getNote(notes, id)
        const folder = this.getFolder(folders, note.folderId)
        return (
            <section className='note-sidebar'>
                <button
                    type='button'
                    value='Back'
                    className='back-button'
                    onClick={() => this.props.history.goBack()}
                />
                <h3>{folder.name}</h3>
            </section>
        );
    }
}