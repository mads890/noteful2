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
        const noteId = parseInt(this.props.match.params.noteId)
        if (notes.length > 0) {
        const note = this.getNote(notes, noteId)
        return (
            <section className='note-page-main'>
                <Note
                    id={parseInt(noteId)}
                    title={note.title}
                    date={note.modified}
                    onDeleteNote={this.handleGoBack}
                />
                <main className='note-content'>
                    {note.content}
                </main>
                
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