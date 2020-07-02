import React, { Component } from 'react';
import Note from './Note';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
                    title={note.title}
                    date={note.modified}
                    onDeleteNote={this.handleGoBack}
                />
                <main className='note-content'>
                    {note.content}
                </main>
                <Link to={`edit-note/${noteId}`}>Edit Note</Link>
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