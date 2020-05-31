import React, { Component } from 'react';
import Note from './Note';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';

export default class NotePgMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
        history: {},
    }
    static contextType = FilesContext;

    handleGoBack = () => {
        this.props.history.push('/')
    }
    
    getNote = (notes, id) => {
        const note = notes.find(note => note.id === id)
        return note;
    }

    render() {
        const { notes } = this.context
        const { noteId } = this.props.match.params
        if (notes.length > 0) {
        const note = this.getNote(notes, noteId)
        return (
            <section className='note-page-main'>
                <Note
                    id={noteId}
                    title={note.name}
                    date={note.modified}
                    onDeleteNote={this.handleGoBack}
                />
                <div className='note-content'>
                    {note.content}
                </div>
            </section>
        );
        }
        else return <div></div>
    }
}

NotePgMain.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}