import React, { Component } from 'react';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';

export default class AddFolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    static defaultProps = {
        history: {}
    }
    static contextType = FilesContext;

    handleChangeName = (name) => {
        this.setState({ name })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const name = {name: this.state.name}
        const url = 'http://localhost:9090/folders'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(name)
        }
        fetch(url, options)
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }
            return res.json()
        })
        .then(resJson => {
            this.context.addFolder(resJson.name, resJson.id)
            this.props.history.push('/')
        })
        .catch(err => {
            console.error({ err })
        })
    }

    render() {
        return (
            <div className='form-container'>
                <h2>Create a New Folder</h2>
                <form className='folder-form' onSubmit={e => this.handleSubmit(e)}>
                    <input type='text' name='name' placeholder='Folder name' aria-label='Name your new folder' onChange={e => this.handleChangeName(e.target.value)} />
                    <button type='submit' className='submit-button' aria-label='Create new folder'>Create</button>
                </form>
            </div>
        );
    }
}

AddFolder.propTypes = {
    history: PropTypes.object.isRequired,
}