import React, { Component } from 'react';
import FilesContext from './FilesContext';
import PropTypes from 'prop-types';

export default class AddFolder extends Component {

    static defaultProps = {
        history: {}
    }
    static contextType = FilesContext;

    handleSubmit = (e) => {
        e.preveneDefault();
        this.props.history.push('/')
    }

    render() {
        return (
            <div className='form-container'>
                <form className='folder-form' onSubmit={e => this.context.addFolder(e.target.name.value)}>
                    <input type='text' name='name' value='Folder name' aria-label='Name your new folder' />
                    <button type='submit' value='Create' aria-label='Create new folder' onClick={e => this.handleSubmit(e)} />
                </form>
            </div>
        );
    }
}

AddFolder.propTypes = {
    history: PropTypes.object.isRequired,
}