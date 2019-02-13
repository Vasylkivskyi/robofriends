import React, { Component } from 'react';

class ErrorBoundry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    // Methods from React version #16 that can catch errors
    componentDidCatch(error, info) {
        this.setState({hasError: true})
    }
    
    render() {
        // We created the statement. When user receive an error, he will be able to see
        // message: 'Ooooups, we have an error!'.
        if (this.state.hasError) {
            return <h1> Ooooups, we have an error!</h1>
        }
        // If there are no errors, user will see CardList component.
        return this.props.children;
    }

}

export default ErrorBoundry;