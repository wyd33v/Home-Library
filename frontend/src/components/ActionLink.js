import React, { Component } from 'react';

export class ActionLink extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.handleClick);
        return (
            <a href = "#" onClick = {(e) => this.props.handleClick(e, this.props.id)}>
                Delete
            </a>
        );
    }
}