import React, { Component } from 'react';
import FilesContext from './FilesContext';
import API_TOKEN from '../config';

export default class EditFolder extends Component {

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
        const title = {"title": `${this.state.title}`}
        const id = parseInt(this.props.match.params.folderId)
        const url = `http://localhost:8000/api/folders/${id}`
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN.API_TOKEN}`
            },
            body: title
        }
        fetch(url, options)
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }
            return res
        })
        .finally(() => {
            this.context.patchFolder(title, id)
            this.props.history.push('/')
        })
        .catch(err => {
            console.error({ err })
        })
    }

    getFolder = (folders, id) => {
        const folder = folders.find(folder => folder.id === id)
        return folder
    }

    render() {
        const id = parseInt(this.props.match.params.folderId)
        const { folders } = this.context
        const folder = this.getFolder(folders, id)
        return (
            <section className='form-container'>
                <h2>Edit Folder {folder.title}</h2>
                <form className='folder-form' onSubmit={e => this.handleSubmit(e)}>
                    <input required aria-required placeholder={this.state.title} type='text' name='name' aria-label='Change the folder name' onChange={e => this.handleChangeTitle(e.target.value)} />
                    <button type='submit' className='submit-button' aria-label='Update folder'>Update</button>
                </form>
            </section>
        )
    }
}