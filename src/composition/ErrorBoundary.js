import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(err) {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return (
                <h2>An error occurred...Try again later.</h2>
            )
        }
        return this.props.children;
    }
}