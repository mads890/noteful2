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
        noteList.find(note => note.id === id)
    }

    getFolder = (folderList, id) => {
        folderList.find(folder => folder.id === id)
    }

    render() {
        const { notes, folders } = this.context
        const { id } = this.props.match.params
        console.log(id)
        const note = this.getNote(notes, id)
        console.log(note)
        const folder = this.getFolder(folders, note.folderId)
        console.log(folder)
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

NotePgSidebar.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}