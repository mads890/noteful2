import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddFolderSidebar extends Component {
    static defaultProps = {
        history: {}
    }
    render() {
        return(
            <button
                type='button'
                className='back-button'
                onClick={() => this.props.history.push('/')}
            >
                Back to list
            </button>
        )
    }
}

AddFolderSidebar.propTypes = {
    history: PropTypes.object.isRequired
}