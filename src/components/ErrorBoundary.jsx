import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, info) {
        // Set state to indicate an error has occurred
        this.setState({ hasError: true });
        // Reload the page
        window.location.reload();
    }

    render() {
        if (this.state.hasError) {
            // You can render a fallback UI here
            return <h1>Something went wrong. Reloading...</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;