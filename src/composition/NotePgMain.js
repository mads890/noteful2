import React, { Component } from 'react';
import Note from './Note';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';

export default class NotePgMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = FilesContext;

    backToList = () => {
        this.props.history.push('/')
    }

    getNote = (noteList, id) => {
        noteList.find(note => note.id === id)
    }

    render() {
        const { notes } = this.context
        const { noteId } = this.props.match.params
        const note = this.getNote(notes, noteId)
        return (
            <section className='note-page-main'>
                <Note
                    id={noteId}
                    title={note.name}
                    date={note.modified}
                    onDeleteNote={this.backToList}
                />
                <div className='note-content'>
                    {note.content}
                </div>
            </section>
        );
    }
}

NotePgMain.propTypes = {
    match: PropTypes.object.isRequired,
}