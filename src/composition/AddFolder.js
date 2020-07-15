import React, { Component } from 'react';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';
import API_TOKEN from '../config';

export default class AddFolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    static defaultProps = {
        history: {}
    }
    static contextType = FilesContext;

    handleChangeTitle = (title) => {
        this.setState({ title })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const title = {title: this.state.title}
        const url = `https://cryptic-brook-62254.herokuapp.com/api/folders/`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN.API_TOKEN}`
            },
            body: JSON.stringify(title)
        }
        fetch(url, options)
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }
            return res.json()
        })
        .then(resJson => {
            this.context.addFolder(resJson.title, resJson.id)
            this.props.history.push('/')
        })
        .catch(err => {
            console.error({ err })
        })
    }

    render() {
        return (
            <section className='form-container'>
                <h2>Create a New Folder</h2>
                <form className='folder-form' onSubmit={e => this.handleSubmit(e)}>
                    <input required aria-required type='text' name='name' placeholder='Folder name' aria-label='Name your new folder' onChange={e => this.handleChangeTitle(e.target.value)} />
                    <button type='submit' className='submit-button' aria-label='Create new folder'>Create</button>
                </form>
            </section>
        );
    }
}

AddFolder.propTypes = {
    history: PropTypes.object.isRequired,
}