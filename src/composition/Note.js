import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilesContext from './FilesContext';

export default class Note extends Component {
    static defaultProps = {
        onDeleteNote: () => {},
    }
    static contextType = FilesContext;

    handleDeleteNote = (e) => {
        e.preventDefault;
        const id = this.props.id
        const url = `localhost:3000/notes/${id}`
        const options = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        }
        fetch(url, options)
        .then(response => {
            if (!response.ok) {
                //throw new Error(`Something went wrong: ${response.message}`) ?
                return response.json()
                .then(err => Promise.reject(err))
            }
            return response.json()
        })
        .then(() => {
            this.context.deleteNote(id)
            this.props.onDeleteNote(id)
        })
        .catch(err => {
            console.error({ err })
        })
    }

    render() {
        const { title, id, date } = this.props
        return (
            <div className='note-list-item'>
                <h2>
                    <Link to={`/note/${id}`}>
                        {title}
                    </Link>
                </h2>
                <button 
                    type='button'
                    onClick={this.handleDeleteNote}
                    className='delete-button'
                >
                    Delete
                </button>
                <div className='date'>
                    <p>Date modified on <span>{date}</span></p>
                </div>
            </div>
        );
    }
}