import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';
import API_TOKEN from '../config';

export default class Note extends Component {
    static defaultProps = {
        deleteNote: () => {},
    }
    static contextType = FilesContext;

    handleDeleteNote = (e) => {
        e.preventDefault();
        const id = this.props.id
        const url = `http://localhost:8000/api/notes/${id}`
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN.API_TOKEN}`
            }
        }
        fetch(url, options)
        .then(response => {
            if (!response.ok) {
                return response
                .then(err => Promise.reject(err))
            }
            return response
        })
        .finally(() => {
            this.context.deleteNote(id)
            this.props.onDeleteNote()
        })
        .catch(err => {
            console.error({ err })
        })
    }

    render() {
        const { title, id, date } = this.props
        return (
            <header className='notes-list-item'>
                <h2>
                    <Link to={`/notes/${id}`}>
                        {title}
                    </Link>
                </h2>
                <button 
                    type='button'
                    onClick={e => this.handleDeleteNote(e)}
                    className='delete-button'
                >
                    Delete
                </button>
                <div className='date'>
                    <p>Date modified on <span>{date}</span></p>
                </div>
            </header>
        );
    }
}

Note.propTypes = {
    deleteNote: PropTypes.func.isRequired,
    onDeleteNote: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
}